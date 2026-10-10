import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
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
    <GridContainer className="mx-4 py-12 bg-white text-plot">
      <ScrollReveal className="col-span-full">
        <h2 className="text-center text-3xl md:text-5xl font-bold uppercase">
          {copy.whatWeDo}
        </h2>

        <ul className="mx-auto mt-8 flex w-full max-w-6xl list-none p-0 text-center">
          {services.map((service, index) => (
            <li key={service.label} className="min-w-0 flex-1">
              <ScrollReveal
                delay={index * 0.12}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <p className="flex min-h-12 md:min-h-16 items-center justify-center px-2 text-base sm:text-xl md:text-3xl font-bold uppercase wrap-break-word">{service.label}</p>
                <div aria-hidden="true" className="relative mt-4 flex justify-center">
                  <span className="size-3 md:size-4 rounded-full bg-current" />
                  {index < services.length - 1 && (
                    <span className="absolute top-1/2 left-[calc(50%+1rem)] h-px w-[calc(100%-2rem)] bg-current" />
                  )}
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </GridContainer>
  );
}
