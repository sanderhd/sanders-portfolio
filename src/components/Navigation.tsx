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
                        data-umami-event={`${link.label} navigation`}
                        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                            pathname === link.href
                                ? "bg-white/[0.08] text-white"
                                : "text-white/45 hover:text-white/80"
                        }`}
                    >
                        {link.label}
                    </Link>
                ))}

                <div ref={dropdownRef} className="relative">
                    <button
                        onClick={() => setOpen((prev) => !prev)}
                        className={`flex items-center gap-1 rounded-full px-4 py-1.5 text-sm transition-colors ${
                            isToolsActive || open
                                ? "bg-white/[0.08] text-white"
                                : "text-white/45 hover:text-white/80" 
                        }`}
                    >
                        Tools
                            <svg
                                className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                    </button>

                    {open && (
                        <div className="absolute top-full left-1/2 mt-2 -translate-x-1/2 min-w-[140px] rounded-2xl border border-white/[0.08] bg-white/5 p-1 backdrop-blur-md">
                            {tools.map((tool) => (
                                <Link
                                    key={tool.href}
                                    href={tool.href}
                                    onClick={() => setOpen(false)}
                                    data-umami-event={`${tool.label} dropdown item`}
                                    className={`block rounded-xl px-4 py-1.5 text-sm transition-colors ${
                                        pathname === tool.href
                                            ? "bg-white/[0.08] text-white"
                                            : "text-white/45 hover:text-white/80"
                                    }`}
                                >
                                    {tool.label}
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </nav>
        </div>
    )
}