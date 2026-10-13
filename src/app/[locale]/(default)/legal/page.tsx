import type { Metadata } from "next";
import Link from "next/link";
import GenericContent from "@/components/generic-content";
import { getCopy, getRouteLocale, withLocale, type Locale } from "@/lib/i18n";
import { getPageMetadata } from "@/lib/metadata";
import { getLegal } from "@/lib/plank/fetch";
import type { LegalLink } from "@/types/domain";

type Props = { params: Promise<{ locale: string }> };

function getLegalHref(locale: Locale, href: string) {
  return withLocale(locale, href.replace(/^\/(?:en|es)(?=\/|$)/, ""));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).legal, "/legal");
}

function LegalLinks({
  title,
  items,
  locale,
}: {
  title: string;
  items: LegalLink[];
  locale: Locale;
}) {
  return (
    <section className="space-y-4">
      <h2 className="text-xl font-bold uppercase text-muted-foreground">
        {title}
      </h2>
      <ul className="divide-y divide-border">
        {items.map((item, index) => (
          <li key={`${item.slug}-${index}`} className="py-4">
            <Link
              href={getLegalHref(locale, item.slug)}
              className="hover:underline"
            >
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default async function LegalPage({ params }: Props) {
  const locale = await getRouteLocale(params);
  const legal = await getLegal({ locale });
  const copy = getCopy(locale);

  return (
    <GenericContent title={copy.legal}>
      <div className="space-y-12">
        <LegalLinks
          title={copy.legalGeneral}
          items={legal.general ?? []}
          locale={locale}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-bold uppercase text-muted-foreground">
            {copy.legalServices}
          </h2>
          <ul className="divide-y divide-border">
            {(legal.services ?? []).map((service, index) => (
              <li
                key={`${service.title}-${index}`}
                className="flex flex-col sm:flex-row gap-4 py-4 sm:items-baseline sm:justify-between"
              >
                <h3>{service.title}</h3>
                <div className="flex flex-wrap gap-4">
                  {service.privacy && (
                    <Link
                      href={getLegalHref(locale, service.privacy)}
                      className="hover:underline"
                      aria-label={`${copy.privacy}: ${service.title}`}
                    >
                      {copy.privacy}
                    </Link>
                  )}
                  {service.terms && (
                    <Link
                      href={getLegalHref(locale, service.terms)}
                      className="hover:underline"
                      aria-label={`${copy.legalTerms}: ${service.title}`}
                    >
                      {copy.legalTerms}
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <LegalLinks
          title={copy.legalAdditional}
          items={legal.additional ?? []}
          locale={locale}
        />
      </div>
    </GenericContent>
  );
}
