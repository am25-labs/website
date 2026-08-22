import PageContainer from "@/components/page-container";
import { cn } from "@/lib/utils";
import type { GridProps } from "@/types/domain";

export default function GridContainer({
  className,
  gap = "gap-4",
  children,
}: GridProps) {
  return (
    <PageContainer>
      <section
        className={cn(
          "grid grid-cols-2 md:grid-cols-8 px-4 mb-8",
          gap,
          className,
        )}
      >
        {children}
      </section>
    </PageContainer>
  );
}
