import GridSix from "@/components/grids/grid-six";
import ScrollReveal from "@/components/scroll-reveal";
import { Card } from "@/components/ui/card";
import type { Locale } from "@/lib/i18n";

type PricingTier = {
  name: string;
  price: string;
  period: string;
  tax: string;
  features: string[];
};

const tiers: Record<Locale, PricingTier[]> = {
  en: [
    {
      name: "Starter",
      price: "$20",
      period: "/mo",
      tax: "+ VAT",
      features: [
        "AM25 Content Hub access",
        "5 Users",
        "50 GB Storage",
        "Technical support (limited)",
      ],
    },
    {
      name: "Professional",
      price: "$45",
      period: "/mo",
      tax: "+ VAT",
      features: [
        "AM25 Content Hub access",
        "10 Users",
        "500 GB Storage",
        "Technical support (basic)",
      ],
    },
    {
      name: "Corporate",
      price: "$110",
      period: "/mo",
      tax: "+ VAT",
      features: [
        "AM25 Content Hub access",
        "25 Users",
        "2 TB Storage",
        "Technical support (priority)",
      ],
    },
  ],
  es: [
    {
      name: "Inicial",
      price: "$20",
      period: "/mes",
      tax: "+ IVA",
      features: [
        "Acceso a AM25 Content Hub",
        "5 Usuarios",
        "50 GB Almacenamiento",
        "Soporte técnico (limitado)",
      ],
    },
    {
      name: "Profesional",
      price: "$45",
      period: "/mes",
      tax: "+ IVA",
      features: [
        "Acceso a AM25 Content Hub",
        "10 Usuarios",
        "500 GB Almacenamiento",
        "Soporte técnico (básico)",
      ],
    },
    {
      name: "Corporativo",
      price: "$110",
      period: "/mes",
      tax: "+ IVA",
      features: [
        "Acceso a AM25 Content Hub",
        "25 Usuarios",
        "2 TB Almacenamiento",
        "Soporte técnico (prioritario)",
      ],
    },
  ],
};

export default function ContentPricing({ locale }: { locale: Locale }) {
  return (
    <GridSix gap="gap-0 h-full">
      <div className="col-span-full grid grid-cols-1 divide-y border border-border md:grid-cols-3 md:divide-x md:divide-y-0">
        {tiers[locale].map((tier, index) => (
          <ScrollReveal className="h-full" delay={index * 0.1} key={tier.name}>
            <Card className="h-full min-h-80 gap-0 rounded-none border-0 bg-background py-0 shadow-none">
              <div className="flex h-full flex-col px-6 py-8">
                <span className="text-lg font-bold uppercase">{tier.name}</span>

                <div className="mt-12">
                  <span className="text-5xl font-bold tracking-tight">
                    {tier.price}
                  </span>
                  <span className="ml-1 text-lg text-muted-foreground">
                    {tier.period}
                  </span>
                  <p className="my-2 text-sm text-muted-foreground">
                    {tier.tax}
                  </p>
                </div>

                <ul className="mt-auto min-h-28 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
                  {tier.features.map((feature) => (
                    <li className="list-inside list-disc" key={feature}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </GridSix>
  );
}
