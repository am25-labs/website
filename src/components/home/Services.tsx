import GridContainer from "@/components/grids/GridContainer";
import ScrollReveal from "@/components/ScrollReveal";
import type { Service } from "@/types/domain";
import type { Locale } from "@/lib/i18n";
import { getCopy } from "@/lib/i18n";

interface ServicesProps {
  services: Service[];
  locale: Locale;
}

export default function Services({ services, locale }: ServicesProps) {
  const copy = getCopy(locale);
  return (
    <GridContainer className="py-12 bg-primary-foreground">
      <ScrollReveal className="col-span-full">
        <h2 className="text-4xl font-bold uppercase md:text-center md:text-5xl">
          {copy.whatWeDo}
        </h2>

        <ul className="mt-8 flex list-none flex-col items-start gap-4 p-0 text-left md:flex-row md:justify-center md:gap-24 md:text-center">
          {services.map((service, index) => (
            <li
              key={service.label}
              className="text-2xl text-muted-foreground md:text-3xl"
            >
              <ScrollReveal
                delay={index * 0.12}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <p>{service.label}</p>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </GridContainer>
  );
}
