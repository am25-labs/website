import { cn } from "@/lib/utils";
import type { GridProps } from "@/types/domain";

export default function GridSix({
  className,
  gap = "gap-4",
  children,
}: GridProps) {
  return (
    <section className={cn("col-span-2 md:col-span-6", className)}>
      <div className={cn("grid grid-cols-2 md:grid-cols-6", gap)}>
        {children}
      </div>
    </section>
  );
}
