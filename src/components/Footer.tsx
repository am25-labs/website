import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ScrollReveal from "@/components/ScrollReveal";
import { getFooter, getFooterNav } from "@/lib/plank/fetch";
import { withLocale, type Locale } from "@/lib/i18n";

export default async function Footer({ locale }: { locale: Locale }) {
  const [nav, footer] = await Promise.all([
    getFooterNav({ locale }),
    getFooter({ locale }),
  ]);

  return (
    <>
      <Separator />

      <footer className="mx-auto w-full max-w-8xl px-4 pt-32 pb-8">
        <ScrollReveal className="flex flex-col gap-12 md:items-center">
          <h2 className="md:text-center text-3xl font-bold uppercase">
            {footer.claim}
          </h2>

          <nav className="mb-8">
            <ul className="flex items-center gap-4 md:gap-12">
              {nav.map((item) => {
                const isExternal = item.href.startsWith("https");

                return (
                  <li key={item.href}>
                    <Link
                      href={withLocale(locale, item.href)}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener" : undefined}
                      className="flex items-center text-sm uppercase hover:underline md:text-base"
                    >
                      {item.label}
                      {isExternal ? (
                        <ArrowUpRightIcon size={16} className="shrink-0" />
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <Link href={withLocale(locale, "/")}>
            <img
              src="/am25-logo.svg"
              alt="AM25 Logo"
              width="160"
              title="AM25"
              className="group-data-[variant=yellow]:brightness-0 group-data-[variant=light]:brightness-0"
            />
          </Link>

          <p className="text-muted-foreground text-xs pt-16">
            &copy; 2026 AM25
          </p>
        </ScrollReveal>
      </footer>
    </>
  );
}
