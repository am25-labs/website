import ContentRenderer from "@/components/content-renderer";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
import type { CaseStudy } from "@/types/domain";
import type { Locale } from "@/lib/i18n";

interface CaseStudyContentProps {
  locale: Locale;
  scope: CaseStudy["scope"];
  problem: CaseStudy["problem"];
  research: CaseStudy["research"];
  solution: CaseStudy["solution"];
  outcome: CaseStudy["outcome"];
  learnings: CaseStudy["learnings"];
}

type Section = {
  label: string;
  content: string | null;
};

const labels = {
  en: {
    scope: "Scope",
    problem: "Problem",
    research: "Research",
    solution: "Solution",
    outcome: "Outcome",
    learnings: "Learnings",
  },
  es: {
    scope: "Alcance",
    problem: "Problema",
    research: "Investigación",
    solution: "Solución",
    outcome: "Resultado",
    learnings: "Aprendizajes",
  },
} as const;

export default function CaseStudyContent({
  locale,
  scope,
  problem,
  research,
  solution,
  outcome,
  learnings,
}: CaseStudyContentProps) {
  const sections: Section[] = [
    { label: labels[locale].scope, content: scope },
    { label: labels[locale].problem, content: problem },
    { label: labels[locale].research, content: research },
    { label: labels[locale].solution, content: solution },
    { label: labels[locale].outcome, content: outcome },
    { label: labels[locale].learnings, content: learnings },
  ];
  const populatedSections = sections.filter(
    (section): section is Section & { content: string } =>
      Boolean(section.content?.trim()),
  );

  if (populatedSections.length === 0) {
    return null;
  }

  return (
    <GridContainer className="mb-2">
      {populatedSections.map((section, index) => (
        <ScrollReveal
          className="col-span-full py-8 md:py-12"
          delay={index * 0.1}
          key={section.label}
        >
          <h3 className="mt-8 mb-6 text-base md:text-lg font-bold uppercase text-neutral-500">
            {section.label}
          </h3>
          <ContentRenderer content={section.content} />
        </ScrollReveal>
      ))}
    </GridContainer>
  );
}
