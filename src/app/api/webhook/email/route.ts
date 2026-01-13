import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const adminEmail = process.env.CONTACT_EMAIL || 'bookings@krishkenya.com';

interface ResendWebhookPayload {
    type: string;
    data: {
        email_id: string;
        from: string;
        to: string[];
        subject: string;
        text: string;
        html?: string;
        headers?: Record<string, string>;
        attachments?: Array<{
            id: string;
            filename: string;
            content_type: string;
            size: number;
        }>;
    };
}

export async function POST(req: NextRequest) {
    try {
        const payload: ResendWebhookPayload = await req.json();

        // Only process email.received events
        if (payload.type !== 'email.received') {
            return NextResponse.json(
                { message: 'Event type not handled' },
                { status: 200 }
            );
        }

        const emailData = payload.data;

        console.log('New email received!');
        console.log('From:', emailData.from);
        console.log('Subject:', emailData.subject);
        console.log('Email ID:', emailData.email_id);

        // Parse from email to extract name and email
        const fromMatch = emailData.from.match(/^(.+?)\s*<(.+?)>$|^(.+?)$/);
        const fromName = fromMatch ? (fromMatch[1] || fromMatch[3] || null) : null;
        const fromEmail = fromMatch ? (fromMatch[2] || fromMatch[3] || emailData.from) : emailData.from;

        // Save email to Supabase database
        const supabase = await createClient();
        
        const { data: savedEmail, error: emailError } = await supabase
            .from('received_emails')
            .insert({
                from_email: fromEmail,
                from_name: fromName,
                subject: emailData.subject,
                text_content: emailData.text,
                html_content: emailData.html || null,
                email_id: emailData.email_id,
                headers: emailData.headers || null,
            })
            .select()
            .single();

        if (emailError) {
            console.error('Error saving email to database:', emailError);
            // Continue processing even if database save fails
        }

        // Handle attachments if present
        let attachmentRecords = [];
        if (emailData.attachments && emailData.attachments.length > 0 && savedEmail) {
            console.log(`Processing ${emailData.attachments.length} attachment(s)`);

            try {
                // Save attachment metadata to database (attachments info is already in webhook payload)
                const attachmentInserts = emailData.attachments.map((attachment) => ({
                    email_id: savedEmail.id,
                    attachment_id: attachment.id,
                    filename: attachment.filename,
                    content_type: attachment.content_type,
                    size: attachment.size,
                    storage_url: null, // Could be populated if storing in Supabase Storage
                }));

                const { data: savedAttachments, error: attachmentError } = await supabase
                    .from('email_attachments')
                    .insert(attachmentInserts)
                    .select();

                if (attachmentError) {
                    console.error('Error saving attachments to database:', attachmentError);
                } else {
                    attachmentRecords = savedAttachments || [];
                    console.log(`Saved ${attachmentRecords.length} attachment(s) to database`);
                }
            } catch (error) {
                console.error('Error processing attachments:', error);
            }
        }

        // Forward email to admin
        try {
            const attachmentInfo = attachmentRecords.length > 0
                ? `<p><strong>Attachments:</strong> ${attachmentRecords.map(a => a.filename).join(', ')} (${attachmentRecords.length} file(s))</p>`
                : '';

            await resend.emails.send({
                from: 'KRISH-KENYA Email Forward <onboarding@resend.dev>',
                to: adminEmail,
                replyTo: fromEmail,
                subject: `Fwd: ${emailData.subject}`,
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <div style="background: #f5f5f5; padding: 15px; border-left: 4px solid #D4AF37; margin-bottom: 20px;">
                            <p style="margin: 0; color: #666; font-size: 12px;"><strong>Forwarded Email</strong></p>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                                <strong>From:</strong> ${fromName ? `${fromName} ` : ''}<a href="mailto:${fromEmail}">${fromEmail}</a>
                            </p>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                                <strong>Subject:</strong> ${emailData.subject}
                            </p>
                            <p style="margin: 5px 0 0 0; color: #666; font-size: 12px;">
                                <strong>Date:</strong> ${new Date().toLocaleString()}
                            </p>
                            ${attachmentInfo}
                        </div>
                        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
                            ${emailData.html || emailData.text.replace(/\n/g, '<br>')}
                        </div>
                        <p style="margin-top: 20px; color: #666; font-size: 12px;">
                            You can reply directly to this email to respond to ${fromName || fromEmail}.
                        </p>
                    </div>
                `,
                text: `
Forwarded Email
From: ${fromName ? `${fromName} ` : ''}${fromEmail}
Subject: ${emailData.subject}
Date: ${new Date().toLocaleString()}

${emailData.text}
                `.trim(),
            });

            console.log('Email forwarded to admin successfully');
        } catch (forwardError) {
            console.error('Error forwarding email to admin:', forwardError);
            // Don't fail the webhook if forwarding fails
        }

        return NextResponse.json(
            { received: true, email_id: emailData.email_id },
            { status: 200 }
        );
    } catch (error) {
        console.error('Webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook failed', message: error instanceof Error ? error.message : 'Unknown error' },
            { status: 400 }
        );
    }
}

