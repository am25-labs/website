import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ScrollReveal from "@/components/ScrollReveal";
import { getFooter, getFooterNav } from "@/lib/plank/fetch";
import { withLocale, type Locale } from "@/lib/i18n";
import GridTwo from "./grids/GridTwo";

export default async function Footer({ locale }: { locale: Locale }) {
  const [nav, footer] = await Promise.all([
    getFooterNav({ locale }),
    getFooter({ locale }),
  ]);

  return (
    <>
      <Separator />

      <footer className="mx-auto w-full max-w-8xl grid grid-cols-2 md:grid-cols-8 px-4 mt-8 mb-16">
        <GridTwo>
          <ScrollReveal className="col-span-full">
            <h2 className="text-4xl md:text-5xl font-bold uppercase leading-[1.1]">
              {footer.claim}
            </h2>
          </ScrollReveal>
        </GridTwo>

        <div className="hidden md:col-span-2 md:block" />

        <div className="col-span-2 flex flex-col gap-12 mt-16 md:col-span-4 md:items-end md:justify-between md:gap-0 md:mt-0">
          <ScrollReveal delay={0.2}>
            <Link href={withLocale(locale, "/")}>
              <img
                src="/am25-logo.svg"
                alt="AM25 Logo"
                width="160"
                title="AM25"
                className="group-data-[variant=yellow]:brightness-0 group-data-[variant=light]:brightness-0"
              />
            </Link>
          </ScrollReveal>

          <ScrollReveal
            className="flex flex-col md:items-end gap-8"
            delay={0.4}
          >
            <nav>
              <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-12">
                {nav.map((item) => {
                  const isExternal = item.href.startsWith("https");

                  return (
                    <li key={item.href}>
                      <Link
                        href={withLocale(locale, item.href)}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener" : undefined}
                        className="w-fit flex items-center uppercase hover:underline md:text-xl"
                      >
                        {item.label}
                        {isExternal ? (
                          <ArrowUpRightIcon size={24} className="shrink-0" />
                        ) : null}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <p className="md:text-xl">&copy; 2026 AM25</p>
          </ScrollReveal>
        </div>
      </footer>
    </>
  );
}
