import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import { BannerPoweredBy, bannerLayoutClasses } from "@/components/powered-by";
import { Separator } from "@/components/ui/separator";

interface ContentNavigationProps {
  href: string;
  label: string;
  plankLabel: string;
}

export default function ContentNavigation({ href, label, plankLabel }: ContentNavigationProps) {
  return (
    <div className="pt-4">
      <Separator className="relative left-1/2 mb-4 data-[orientation=horizontal]:w-screen -translate-x-1/2" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={href} className={`${bannerLayoutClasses} text-center transition-colors hover:bg-white/20 group-data-[variant=light]:hover:bg-plot-soft`}>
          <span className="text-sm font-bold uppercase tracking-widest">{label}</span>
          <ChevronLeftIcon className="size-10" aria-hidden="true" />
        </Link>
        <BannerPoweredBy
          logoSrc="/plank-logo-w.svg"
          logoAlt="Plank CMS"
          label={plankLabel}
          link="https://plank-cms.com"
          mode="dark"
        />
      </div>
    </div>
  );
}
