export const dynamic = 'force-dynamic'; // ← Tambahkan ini!

import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
    console.log('=== CONTACT API CALLED ===');

    try {
        const body = await request.json();
        console.log('Request body:', body);

        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            console.warn('Validation failed: missing fields');
            return NextResponse.json(
                { message: 'Semua field harus diisi.' },
                { status: 400 }
            );
        }

        const gmailUser = process.env.GMAIL_USER;
        const gmailPass = process.env.GMAIL_PASS;

        console.log('GMAIL_USER:', gmailUser ? '✔️' : '❌');
        console.log('GMAIL_PASS:', gmailPass ? '✔️' : '❌');

        if (!gmailUser || !gmailPass) {
            return NextResponse.json(
                { message: 'Konfigurasi email belum lengkap di environment variable.' },
                { status: 500 }
            );
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: gmailUser,
                pass: gmailPass,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });

        try {
            await transporter.verify();
            console.log('Transporter verified successfully');
        } catch (verifyError) {
            console.error('Transporter verification failed:', verifyError);
            return NextResponse.json(
                { message: 'Gagal terhubung ke server email. Coba lagi nanti.' },
                { status: 500 }
            );
        }

        const mailOptions = {
            from: `"Contact Form" <${gmailUser}>`,
            to: gmailUser,
            replyTo: email,
            subject: `Pesan dari Website: ${subject}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2>Pesan Baru dari Formulir Kontak</h2>
                    <p><strong>Nama:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subjek:</strong> ${subject}</p>
                    <hr>
                    <p><strong>Pesan:</strong><br>${message.replace(/\n/g, '<br>')}</p>
                    <hr>
                    <small>Dikirim pada ${new Date().toLocaleString('id-ID', {
                timeZone: 'Asia/Jakarta'
            })}</small>
                </div>
            `,
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', result.messageId);

        return NextResponse.json(
            { message: 'Pesan berhasil terkirim. Terima kasih telah menghubungi!' },
            { status: 200 }
        );

    } catch (error: any) {
        console.error('Terjadi kesalahan saat mengirim email:', error);

        return NextResponse.json(
            {
                message: 'Gagal mengirim email. Silakan coba lagi atau hubungi langsung.',
                error: error.message || error.toString()
            },
            { status: 500 }
        );
    }
}
