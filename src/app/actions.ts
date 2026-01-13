'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function subscribeToNewsletter(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { error: 'Email is required' };
    }

    try {
        // You might want to save this to Supabase as well
        // For now, we'll just send a welcome email via Resend
        // and ideally add them to a Resend Audience if configured

        await resend.emails.send({
            from: 'Krish-Kenya <onboarding@resend.dev>', // Update this with your verified domain later
            to: email,
            subject: 'Welcome to the Movement',
            html: '<p>Thanks for subscribing to updates from Krish-Kenya directly from the underground!</p>'
        });

        // Optional: Send yourself a notification
        await resend.emails.send({
            from: 'Krish-Kenya Website <onboarding@resend.dev>',
            to: 'bookings@krishkenya.com', // Or your personal email
            subject: 'New Newsletter Subscriber',
            html: `<p>New subscriber: ${email}</p>`
        });

        return { success: true };
    } catch (error) {
        console.error('Newsletter error:', error);
        return { error: 'Failed to subscribe. Please try again.' };
    }
}

export async function sendContactMessage(formData: FormData) {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const message = formData.get('message') as string;

    if (!name || !email || !message) {
        return { error: 'Missing required fields' };
    }

    try {
        // Send email to admin/booking team
        await resend.emails.send({
            from: 'KRISH-KENYA Website <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL || 'bookings@krishkenya.com',
            replyTo: email,
            subject: `New Booking/Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #D4AF37;">New Contact Form Submission</h1>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                        ${phone ? `<p><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>` : ''}
                    </div>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px;">
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p style="margin-top: 20px; color: #666; font-size: 12px;">
                        You can reply directly to this email to respond to ${name}.
                    </p>
                </div>
            `
        });

        // Send confirmation email to user
        await resend.emails.send({
            from: 'KRISH-KENYA <onboarding@resend.dev>',
            to: email,
            subject: 'Thank you for contacting KRISH-KENYA',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #D4AF37;">Thank You, ${name}!</h1>
                    <p>We've received your message and will get back to you as soon as possible.</p>
                    <div style="background: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <p><strong>Your Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    </div>
                    <p>For urgent bookings or inquiries, you can also reach us at:</p>
                    <ul>
                        <li>Email: <a href="mailto:bookings@krishkenya.com">bookings@krishkenya.com</a></li>
                        <li>Phone: +254 794 633 685</li>
                    </ul>
                    <p style="margin-top: 30px; color: #666; font-size: 12px;">
                        Best regards,<br>
                        The KRISH-KENYA Team
                    </p>
                </div>
            `
        });

        return { success: true };
    } catch (error) {
        console.error('Contact form error:', error);
        return { error: 'Failed to send message. Please try again.' };
    }
}
