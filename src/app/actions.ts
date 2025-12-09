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
        await resend.emails.send({
            from: 'Contact Form <onboarding@resend.dev>',
            to: 'bookings@krishkenya.com', // Replace with verified sender/receiver
            replyTo: email,
            subject: `New Message from ${name}`,
            html: `
                <h1>New Contact Form Submission</h1>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `
        });

        return { success: true };
    } catch (error) {
        console.error('Contact form error:', error);
        return { error: 'Failed to send message. Please try again.' };
    }
}
