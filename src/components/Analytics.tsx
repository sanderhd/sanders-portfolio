"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { reportError, track } from "@/lib/track";

export default function Analytics() {
    const pathname = usePathname();

    useEffect(() => {
        track("pageview");
    }, [pathname]);

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const el = (e.target as Element | null)?.closest<HTMLElement>("a, button, [data-track]");
            if (!el) return;

            const href = el instanceof HTMLAnchorElement ? el.href : undefined;
            const name =
                el.dataset.track ||
                el.getAttribute("aria-label") ||
                el.textContent?.trim().slice(0, 60) ||
                el.tagName.toLowerCase();

            track("click", {
                name,
                href,
                outbound: href ? new URL(href).host !== window.location.host : undefined,
            });
        }

        function handleError(e: ErrorEvent) {
            reportError(e.error ?? e.message, "window.onerror");
        }

        function handleRejection(e: PromiseRejectionEvent) {
            reportError(e.reason, "unhandledrejection");
        }

        document.addEventListener("click", handleClick, { capture: true });
        window.addEventListener("error", handleError);
        window.addEventListener("unhandledrejection", handleRejection);

        return () => {
            document.removeEventListener("click", handleClick, { capture: true });
            window.removeEventListener("error", handleError);
            window.removeEventListener("unhandledrejection", handleRejection);
        };
    }, []);

    return null;
}
