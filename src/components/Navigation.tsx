"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

const links = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects"},
    { label: "Contact", href: "/contact"},
];

const tools = [
    { label: "Status", href: "/status" },
]

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    })

    const isToolsActive = tools.some((t) => pathname === t.href);

    return (
        <div className="fixed top-6 left-0 right-0 z-50 flex justify-center">
            <nav className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/5 p-1 backdrop-blur-md">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                            pathname === link.href
                                ? "bg-white/[0.08] text-white"
                                : "text-white/45 hover:text-white/80"
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
        </div>
    )
}