import Hero from "@/components/heros/Hero";
import FeaturedWork from "@/components/home/FeaturedWork";
import RecentEntries from "@/components/home/RecentEntries";
import Services from "@/components/home/Services";
import { getHome } from "@/lib/plank/fetch";
import { Separator } from "@/components/ui/separator";

export default async function HomePage() {
  const { heading, description, services } = await getHome();

  return (
    <>
      <Hero heading={heading} description={description} />
      <Separator className="col-span-full mb-8" />

      <FeaturedWork />

      <Services services={services} />

      <RecentEntries />
    </>
  );
}
