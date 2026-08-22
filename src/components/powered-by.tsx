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
      className={`flex flex-col items-center justify-center gap-4 px-6 py-8 ${
        isDark ? "bg-neutral-950" : "bg-neutral-100"
      }`}
    >
      <p
        className={`text-xs uppercase tracking-widest ${
          isDark ? "text-white" : "text-black"
        }`}
      >
        {label}
      </p>

      <a href={link} target="_blank" rel="noopener" className="w-fit">
        <img
          src={logoSrc}
          alt={logoAlt}
          className={`h-10 w-auto ${isDark ? "" : "brightness-0"} ${link ? "hover:scale-110" : ""}`}
        />
      </a>
    </div>
  );
}
