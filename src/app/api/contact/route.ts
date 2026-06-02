import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstile(token: string) {
    const res = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY!,
                response: token,
            }),
        }
    );

    return res.json();
}

export async function sendToDiscord({ name, email, message, verification }: any) {
    await fetch(process.env.DISCORD_WEBHOOK_URL!, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            embeds: [
                {
                    title: "📦 New Contact Message",
                    color: verification.success ? 0x22c55e : 0xef4444,
                    fields: [
                        { name: "Name", value: name, inline: true },
                        { name: "Email", value: email, inline: true },
                        { name: "Turnstile", value: verification.success ? "✅ Passed" : "❌ Failed" },
                        { name: "Message", value: message },
                    ],
                    footer: {
                        text: `Hostname: ${verification.hostname || "unknown"}`
                    },
                    timestamp: new Date().toISOString(),
                },
            ],
        }),
    });
}

export async function POST(req: Request) {
    const { name, email, message, token } = await req.json();

    const verification = await verifyTurnstile(token);

    if (!verification.success) {
        return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    await sendToDiscord({ name, email, message, verification });

    await resend.emails.send({
        from: "Contact <notifications@mail.sander.tf>",
        to: email,
        subject: `Thanks for contacting me!`,
        replyTo: email,
        text: `
Hi ${name},

Thanks for contacting me through my website.

I've received your message and will get back to you as soon as possible.

Your message:
"${message}"

Kind regards,
Sander
        `,
    });

    return NextResponse.json({ ok: true });
}