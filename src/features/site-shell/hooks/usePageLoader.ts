"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function usePageLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => window.clearTimeout(timer);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement;
      const href = target.getAttribute("href");
      const targetAttr = target.getAttribute("target");

      if (
        href &&
        href.startsWith("/") &&
        targetAttr !== "_blank" &&
        href !== `${pathname}${window.location.search}`
      ) {
        setIsLoading(true);
      }
    };

    const attachListeners = () => {
      document
        .querySelectorAll('a[href^="/"]')
        .forEach((anchor) =>
          anchor.addEventListener("click", handleAnchorClick as EventListener),
        );
    };

    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      document
        .querySelectorAll('a[href^="/"]')
        .forEach((anchor) =>
          anchor.removeEventListener(
            "click",
            handleAnchorClick as EventListener,
          ),
        );
    };
  }, [pathname]);

  return { isLoading };
}
