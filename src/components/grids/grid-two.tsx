import { cn } from "@/lib/utils";
import type { GridProps } from "@/types/domain";

export default function GridTwo({
  className,
  gap = "gap-4",
  children,
}: GridProps) {
  return (
    <section className={cn("col-span-2", className)}>
      <div className={cn("grid grid-cols-2", gap)}>{children}</div>
    </section>
  );
}
