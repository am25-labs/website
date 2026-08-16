"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import type { HeaderSocialItem } from "@/lib/navigation/header-social-items";
import type { NavigationItem } from "@/types/domain";
import { cn } from "@/lib/utils";
import { withLocale } from "@/lib/i18n";
import LocaleSwitch from "@/components/LocaleSwitch";
import type { Locale } from "@/lib/i18n";

interface MobileMenuProps {
  items: NavigationItem[];
  socialItems: HeaderSocialItem[];
  locale: Locale;
}

export default function MobileMenu({ items, socialItems, locale }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen((current) => !current)}
        className="inline-flex size-9 items-center justify-center rounded-md hover:bg-accent"
        aria-expanded={open}
        aria-label="Main navigation (mobile)"
      >
        {open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </button>

      <div
        className={cn(
          "absolute right-0 top-full z-50 mt-1 min-w-48 border bg-popover p-1 text-popover-foreground ring-1 ring-foreground/5",
          !open && "hidden",
        )}
        aria-label="Main navigation (mobile)"
      >
        <ul>
          {items.map((item) => {
            const isExternal = item.href.startsWith("https");

            return (
              <li key={item.href}>
                <Link
                  href={withLocale(locale, item.href)}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener" : undefined}
                  className="flex items-center gap-2 px-3 py-2 text-base uppercase hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {isExternal ? <ArrowUpRightIcon size={20} className="shrink-0 text-am-y" /> : null}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="-mx-1 my-1 h-px bg-border/50" />

        <ul className="flex flex-row" aria-label="Social media links">
          {socialItems.map((item) => {
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center p-2 hover:bg-accent"
                >
                  <BrandIcon icon={item.icon} size={item.size} />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="-mx-1 mt-1 border-t px-3 py-2">
          <LocaleSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
}
