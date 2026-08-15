import Hero from "@/components/heros/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import RecentEntries from "@/components/home/RecentEntries";
import Services from "@/components/home/Services";
import { getHome } from "@/lib/plank/fetch";
import { Separator } from "@/components/ui/separator";
import { getLocale } from "@/lib/i18n-server";

export default async function HomePage() {
  const locale = await getLocale();
  const { heading, description, services } = await getHome({ locale });

  return (
    <>
      <Hero heading={heading} description={description} />
      <Separator className="col-span-full mb-8" />

      <FeaturedWork />

      <Services services={services} locale={locale} />

      <RecentEntries />
    </>
  );
}
