import nodemailer from 'nodemailer';

const smtpConfig = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
};

// Check if credentials exist
const hasCredentials = process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD;

const transporter = hasCredentials ? nodemailer.createTransport(smtpConfig) : null;

export async function sendEmail(to: string, subject: string, html: string) {
    if (!transporter) {
        console.log(`[EMAIL DEV MODE] To: ${to} | Subject: ${subject}`);
        return;
    }

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Futuristic Security" <no-reply@futuristic.ke>',
            to,
            subject,
            html,
        });
        console.log(`[EMAIL SENT] To: ${to} | Subject: ${subject}`);
    } catch (error) {
        console.error('[EMAIL ERROR]', error);
    }
}

export async function sendAlertEmail(userEmail: string, siteName: string, url: string, issue: string) {
    const subject = `🚨 Security Alert: ${siteName} is DOWN or AT RISK`;
    const html = `
        <div style="font-family: sans-serif; padding: 20px;">
            <h2 style="color: #e63946;">Security Alert</h2>
            <p>Your monitored website <strong>${siteName}</strong> (${url}) has triggered an alert.</p>
            <div style="background: #f8d7da; padding: 15px; border-radius: 5px; color: #721c24;">
                <strong>Issue Detected:</strong> ${issue}
            </div>
            <p>Please log in to your dashboard to investigate immediately.</p>
            <a href="${process.env.NEXTAUTH_URL}/dashboard" style="display: inline-block; padding: 10px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 5px;">Go to Dashboard</a>
        </div>
    `;
    await sendEmail(userEmail, subject, html);
}
