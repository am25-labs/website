import ContentRenderer from "@/components/content-renderer";
import ScrollReveal from "@/components/scroll-reveal";
import { formatDate } from "@/lib/utils";
import { RefreshCwIcon } from "lucide-react";
import { dateLocale, type Locale } from "@/lib/i18n";
import type { LegalPage } from "@/types/domain";

interface Props {
  title: string;
  page: LegalPage;
  locale: Locale;
}

export default function LocalizedLegalTabs({ title, page, locale }: Props) {
  const date = page.date
    ? formatDate(page.date, {
        locale: dateLocale(locale),
      })
    : null;

  return (
    <div className="mb-8 grid grid-cols-2 gap-4 px-4 md:grid-cols-8">
      <section className="col-span-2 mb-8">
        <ScrollReveal className="grid grid-cols-2 gap-4" direction="down">
          <div className="col-span-full">
            <h1 className="text-3xl md:text-4xl font-bold uppercase">
              {title}
            </h1>

            {date && (
              <p className="mt-4 flex items-center gap-2 text-muted-foreground">
                <RefreshCwIcon size={16} />
                {date}
              </p>
            )}
          </div>
        </ScrollReveal>
      </section>

      <section className="col-span-2 md:col-span-4">
        <ScrollReveal className="grid grid-cols-2 gap-4 md:grid-cols-4" delay={0.15}>
          <div className="col-span-full">
            {page.content && (
              <ContentRenderer content={page.content} />
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
