import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import { getMainNav } from "@/lib/plank/fetch";
import { headerSocialItems } from "@/lib/navigation/header-social-items";
import MobileMenu from "@/components/MobileMenu";
import LocaleSwitch from "@/components/LocaleSwitch";
import { withLocale, type Locale } from "@/lib/i18n";

export default async function Header({ locale }: { locale: Locale }) {
  const mainNav = await getMainNav({ locale });

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex w-full max-w-8xl items-center justify-between bg-black p-4 group-data-[variant=yellow]:bg-am-y group-data-[variant=light]:bg-white">
        <Link href={withLocale(locale, "/")}>
          <img
            src="/am25-logo.svg"
            alt="AM25 Logo"
            width="100"
            title="AM25"
            className="group-data-[variant=yellow]:brightness-0 group-data-[variant=light]:brightness-0"
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
                        className="shrink-0 text-am-y group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black"
                      />
                    ) : null}
                  </Link>
                </li>
              );
            })}

            {headerSocialItems.map((item) => {
              return (
                <li key={item.href} className="hover:scale-110">
                  <a href={item.href} target="_blank" rel="noopener">
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
