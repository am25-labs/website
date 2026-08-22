import Link from "next/link";
import { Card } from "@/components/ui/card";
import type { WorkCardProps } from "@/types/domain";
import { formatDate } from "@/lib/utils";

export default function WorkCard({
  cover,
  title,
  href,
  category,
  publishedAt,
}: WorkCardProps) {
  const isExternal = href.startsWith("https");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      title={title}
      className="group/card"
    >
      <Card className="aspect-4/5 overflow-hidden p-0">
        {cover ? (
          <img src={cover} alt={title} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-muted-foreground/10" />
        )}
      </Card>

      <p className="mt-2 text-xl font-bold uppercase group-hover/card:underline">
        {title}
      </p>

      <div className="mt-1 flex flex-col gap-1">
        <span className="text-xs text-muted-foreground group-data-[variant=yellow]:text-black">
          {category}
        </span>
        {publishedAt ? (
          <span className="text-xs text-muted-foreground group-data-[variant=yellow]:text-black">
            {formatDate(publishedAt)}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
