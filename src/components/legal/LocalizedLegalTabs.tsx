"use client";

import { useMemo, useState } from "react";
import ContentRenderer from "@/components/ContentRenderer";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDate } from "@/lib/utils";
import { RefreshCwIcon } from "lucide-react";
import type { LegalPage } from "@/types/domain";

interface Props {
  title: string;
  enPage: LegalPage | null;
  esPage: LegalPage | null;
}

type Locale = "en" | "es";

export default function LocalizedLegalTabs({ title, enPage, esPage }: Props) {
  const initialLocale: Locale = enPage ? "en" : "es";
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const activePage = useMemo(() => {
    if (locale === "en") {
      return enPage ?? esPage;
    }

    return esPage ?? enPage;
  }, [locale, enPage, esPage]);

  if (!activePage) {
    return null;
  }

  const date = activePage.date
    ? formatDate(activePage.date, {
        locale: locale === "es" ? "es-SV" : "en-US",
      })
    : null;

  return (
    <div className="mb-16 grid grid-cols-2 gap-4 px-4 md:grid-cols-8">
      <section className="col-span-2 mb-8">
        <div className="grid grid-cols-2 gap-4">
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
        </div>
      </section>

      <section className="col-span-2 md:col-span-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <Tabs
            value={locale}
            onValueChange={(next) => setLocale(next as Locale)}
          >
            <TabsList>
              <TabsTrigger value="en" disabled={!enPage}>
                EN
              </TabsTrigger>
              <TabsTrigger value="es" disabled={!esPage}>
                ES
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="col-span-full">
            {activePage.content && (
              <ContentRenderer content={activePage.content} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
