import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const spaceGrotesk = localFont({
    src: [
        {
            path: "../fonts/SpaceGrotesk-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/SpaceGrotesk-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],

    variable: "--font-space-grotesk"
})

export const metadata: Metadata = {
    title: "Sander's Portfolio",
    description: "Sander's new Portfolio, made with NextJS",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            className={`${spaceGrotesk.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
