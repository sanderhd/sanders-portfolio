"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navigation";

declare global {
    interface Window {
        onTurnstileSuccess?: (token: string) => void;
    }
}

export default function Contact() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        window.onTurnstileSuccess = (token: string) => {
            setToken(token);
        };

        const script = document.createElement("script");
        script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
        script.async = true;
        document.body.appendChild(script);
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formElement = e.currentTarget;
        setLoading(true);

        const form = new FormData(e.currentTarget);

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: form.get("name"),
                email: form.get("email"),
                message: form.get("message"),
                token,
            }),
        });

        setLoading(false);

        if (res.ok) {
            setSuccess(true);
            formElement.reset();
        }
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(64,64,64,0.4),rgba(255,255,255,0))]" />

            <Navbar />

            <h1 className="text-3xl font-bold text-white mb-6">
                Contact
            </h1>

            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4">
                <input 
                    name="name" 
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" 
                />

                <input 
                    name="email" 
                    placeholder="Your email"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" 
                />

                <textarea 
                    name="message" 
                    rows={5} 
                    placeholder="Message"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white" 
                />

                <div
                    className="cf-turnstile"
                    data-sitekey="0x4AAAAAADdtiGFMKAtTrt4y"
                    data-theme="dark"
                    data-size="flexible"
                    data-callback="onTurnstileSuccess"
                />

                <button
                    disabled={loading}
                    className="w-full py-3 bg-white text-black rounded"
                >
                    {loading ? "Sending..." : "Send"}
                </button>

                {success && (
                    <p className="text-green-400 text-sm">
                        Message sent successfully!
                    </p>
                )}

            </form>
        </div>
    );
}