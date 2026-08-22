import Hero from "@/components/heros/hero";
import FeaturedWork from "@/components/home/featured-work";
import RecentEntries from "@/components/home/recent-entries";
import Services from "@/components/home/services";
import { getHome } from "@/lib/plank/fetch";
import { Separator } from "@/components/ui/separator";
import { isLocale, type Locale } from "@/lib/i18n";
import { notFound } from "next/navigation";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: value } = await params;
  if (!isLocale(value)) notFound();
  const locale: Locale = value;
  const { heading, description, services } = await getHome({ locale });

  return (
    <>
      <Hero heading={heading} description={description} />
      <Separator className="col-span-full mb-8" />

      <FeaturedWork locale={locale} />

      <Services services={services} locale={locale} />

      <RecentEntries locale={locale} />
    </>
  );
}
