"use client";

export default function GlobalError() {
    return (
        <html lang="en">
            <body className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="text-center px-6">
                    <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
                    <p className="text-white/60">
                        Please try refreshing the page.
                    </p>
                </div>
            </body>
        </html>
    );
}
