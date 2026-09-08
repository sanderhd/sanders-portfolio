import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-white/20 bg-neutral-950 px-8 py-10">
            <div className="mx-auto max-w-4xl">
                <div className="grid grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-white font-semibold text-lg mb-1">
                            sander<span className="text-gray-500">hd</span>
                        </p>
                        <p className="text-white/50 text-sm">
                            Building <span className="text-white/20">(and breaking)</span> things
                        </p>
                    </div>
                    <div>
                        <p className="text-[11px] uppercase tracking-widest text-white/25 mb-3">Links</p>
                        <div className="flex flex-col gap-2">
                            {[
                                { label: "Home", href: "/" },
                                { label: "Projects", href: "/projects" },
                                { label: "GitHub", href: "https://github.com/sanderhd" },
                                { label: "Contact", href: "/contact" },
                            ].map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm text-white/50 hover:text-gray-400 transition-colors w-fit"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="border-t border-white/[0.07] pt-5 flex justify-between items-center">
                    <p className="text-xs text-white/20">© 2026 Sander. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}