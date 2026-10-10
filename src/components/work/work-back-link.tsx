import ContentNavigation from "@/components/content-navigation";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
import { getCopy, withLocale, type Locale } from "@/lib/i18n";

interface WorkBackLinkProps {
  locale: Locale;
  destination?: "works" | "notes";
}

export default function WorkBackLink({
  locale,
  destination = "works",
}: WorkBackLinkProps) {
  const copy = getCopy(locale);
  const isNotesDestination = destination === "notes";

  return (
    <GridContainer className="mb-4">
      <ScrollReveal className="col-span-full">
        <ContentNavigation
          href={withLocale(locale, isNotesDestination ? "/notes" : "/work")}
          label={isNotesDestination ? copy.backToNotes : copy.backToWorks}
          plankLabel={copy.poweredByPlank}
        />
      </ScrollReveal>
    </GridContainer>
  );
}
