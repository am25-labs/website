import ContentRenderer from "@/components/content-renderer";
import CaseStudyNavigation from "@/components/case-study/case-study-navigation";
import GridContainer from "@/components/grids/grid-container";
import GridSix from "@/components/grids/grid-six";
import GridTwo from "@/components/grids/grid-two";
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
  id: string;
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
    { id: "scope", label: labels[locale].scope, content: scope },
    { id: "problem", label: labels[locale].problem, content: problem },
    { id: "research", label: labels[locale].research, content: research },
    { id: "solution", label: labels[locale].solution, content: solution },
    { id: "outcome", label: labels[locale].outcome, content: outcome },
    { id: "learnings", label: labels[locale].learnings, content: learnings },
  ];
  const populatedSections = sections.filter(
    (section): section is Section & { content: string } =>
      Boolean(section.content?.trim()),
  );

  if (populatedSections.length === 0) {
    return null;
  }

  return (
    <GridContainer className="mt-8">
      <GridTwo className="hidden md:block md:[&>div]:h-full pt-8">
        <CaseStudyNavigation sections={populatedSections} />
      </GridTwo>

      <GridSix>
        {populatedSections.map((section, index) => (
          <ScrollReveal
            className="col-span-full py-8"
            delay={index * 0.1}
            key={section.id}
          >
            <section id={section.id} className="scroll-mt-24">
              <h3 className="mb-4 text-base md:text-lg font-bold uppercase text-neutral-500">
                {section.label}
              </h3>
              <div className="case-study-content">
                <ContentRenderer content={section.content} revealBlocks />
              </div>
            </section>
          </ScrollReveal>
        ))}
      </GridSix>
    </GridContainer>
  );
}
