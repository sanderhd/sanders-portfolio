import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next"
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

    openGraph: {
        title: "Sander's Portfolio",
        description: "Sander's new Portfolio, made with NextJS",
        url: "https://sander.tf/",
        siteName: "Sander's Portfolio",
        images: [
            {
                url: "https://sander.tf/banner.png",
                width: 1200,
                height: 630,
                alt: "Sander's Portfolio Banner"
            },
        ],
        type: "website"
    },

    twitter: {
        card: "summary_large_image",
        title: "Sander's Portfolio",
        description: "Sander's new Portfolio, made with NextJS",
        images: [
            "https://sander.tf/banner.png"
        ],
    },
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
            <Analytics />
            
            <body className="min-h-full flex flex-col">
                {children}
            </body>
        </html>
    );
}
