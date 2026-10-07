import type { CSSProperties } from "react";

interface BannerProps {
  logoSrc: string;
  logoAlt?: string;
  label?: string;
  link?: string;
  mode?: "light" | "dark";
}

export function BannerPoweredBy({
  logoSrc,
  logoAlt = "Logo",
  label = "Powered by",
  link,
  mode = "light",
}: BannerProps) {
  const isDark = mode === "dark";

  return (
    <div
      className={`flex flex-col items-center justify-center gap-4 px-6 py-8 group-data-[variant=default]:bg-white group-data-[variant=light]:bg-plot ${
        isDark ? "bg-neutral-950" : "bg-neutral-100"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-widest group-data-[variant=default]:text-plot group-data-[variant=light]:text-white ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener"
        className="relative block w-fit"
        style={{ "--logo-url": `url("${logoSrc}")` } as CSSProperties}
      >
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`h-10 w-auto group-data-[variant=default]:opacity-0 group-data-[variant=light]:opacity-0 ${isDark ? "" : "brightness-0"} ${link ? "hover:scale-110" : ""}`}
        />
        <span
          aria-hidden="true"
          className={`absolute inset-0 hidden [mask-image:var(--logo-url)] [mask-position:center] [mask-size:contain] [mask-repeat:no-repeat] group-data-[variant=default]:block group-data-[variant=default]:bg-plot group-data-[variant=light]:block group-data-[variant=light]:bg-white ${link ? "hover:scale-110" : ""}`}
        />
      </a>
    </div>
  );
}
