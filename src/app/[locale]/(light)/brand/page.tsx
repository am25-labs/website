import GridContainer from "@/components/grids/grid-container";
import GridFour from "@/components/grids/grid-four";
import GridSix from "@/components/grids/grid-six";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getPageMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getCopy, getRouteLocale } from "@/lib/i18n";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Our brand";

const rules = [
  {
    title: "01 The brief wins.",
    description:
      "Business is important. We're not going to lie to ourselves — or to you — by saying otherwise.",
  },
  {
    title: "02 Less, if less works.",
    description:
      "If it looks done without the extra element, it's done. No gradients to fill silence.",
  },
  {
    title: "03 One opinion at a time.",
    description:
      "A direction is a decision. We'd rather commit and iterate than hedge across three variants.",
  },
  {
    title: "04 Build it, then ship it.",
    description:
      "Design and development in the same room. Handoffs, when they happen, are short.",
  },
] as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const locale = await getRouteLocale(params);
  return getPageMetadata(locale, getCopy(locale).ourBrandPage, "/brand");
}

export default function BrandPage() {
  return <GridContainer></GridContainer>;
}
