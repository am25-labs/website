import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import BrandIcon from "@/components/brand-icon";
import { getMainNav } from "@/lib/plank/fetch";
import { getHeaderSocialItems } from "@/lib/navigation/header-social-items";
import MobileMenu from "@/components/mobile-menu";
import LocaleSwitch from "@/components/locale-switch";
import { withLocale, type Locale } from "@/lib/i18n";

export default async function Header({ locale }: { locale: Locale }) {
  const mainNav = await getMainNav({ locale });
  const headerSocialItems = getHeaderSocialItems(locale);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-8xl items-center justify-between bg-electric p-4 group-data-[variant=light]:bg-white">
        <Link href={withLocale(locale, "/")} className="relative block">
          <img
            src="/am25-logo.svg"
            alt="AM25 Logo"
            width="128"
            title="AM25"
            className="group-data-[variant=light]:opacity-0"
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 hidden bg-electric [mask:url('/am25-logo.svg')_center/contain_no-repeat] group-data-[variant=light]:block"
          />
        </Link>

        <nav
          aria-label="Main and social navigation (desktop)"
          className="hidden md:block"
        >
          <ul className="flex items-center gap-8">
            {mainNav.map((item) => {
              const isExternal = item.href.startsWith("https");

              return (
                <li key={item.href}>
                  <Link
                    href={withLocale(locale, item.href)}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener" : undefined}
                    className="flex items-center text-xl uppercase hover:underline"
                  >
                    {item.label}
                    {isExternal ? (
                      <ArrowUpRightIcon
                        size={20}
                        className="shrink-0 text-white group-data-[variant=light]:text-electric"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}

            {headerSocialItems.map((item) => {
              return (
                <li key={item.href} className="hover:scale-110">
                  <a
                    href={item.href}
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener" : undefined}
                  >
                    <BrandIcon icon={item.icon} size={item.size} />
                  </a>
                </li>
              );
            })}
            <li>
              <LocaleSwitch locale={locale} />
            </li>
          </ul>
        </nav>

        <div className="md:hidden">
          <MobileMenu
            items={mainNav}
            socialItems={headerSocialItems}
            locale={locale}
          />
        </div>
      </header>

      <div className="pb-32" />
    </>
  );
}
