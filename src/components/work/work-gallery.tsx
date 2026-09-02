import Image from "next/image";
import type { PlankMediaGallery, Work } from "@/types/domain";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";

interface WorkGalleryProps {
  images?: PlankMediaGallery | null;
  quote?: Work["quote"];
}

export default function WorkGallery({
  images: rawImages,
  quote,
}: WorkGalleryProps) {
  const images = rawImages ?? [];

  const groups: PlankMediaGallery[] = [];
  for (let i = 0; i < images.length; i += 3) {
    groups.push(images.slice(i, i + 3));
  }

  return (
    <GridContainer className="mb-2">
      {quote && (
        <ScrollReveal className="col-span-full py-32">
          <blockquote className="text-lg md:text-3xl text-center italic max-w-4xl mx-auto">
            "{quote}"
          </blockquote>
        </ScrollReveal>
      )}

      {groups.map((group, groupIndex) => {
        const firstImage = group[0];
        const pair = group.slice(1);

        if (!firstImage) {
          return null;
        }

        return (
          <ScrollReveal
            className="col-span-full"
            delay={groupIndex * 0.1}
            key={groupIndex}
          >
            <div className="aspect-[5/4] overflow-hidden md:aspect-auto">
              <Image
                src={firstImage.url}
                alt={firstImage.alt ?? ""}
                width={firstImage.width ?? 1600}
                height={firstImage.height ?? 1200}
                sizes="100vw"
                className="h-full w-full object-cover md:h-auto md:object-contain"
              />
            </div>

            {pair.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {pair.map((image, i) => (
                  <div
                    className="aspect-[5/4] overflow-hidden md:aspect-auto"
                    key={image.id ?? i}
                  >
                    <Image
                      src={image.url}
                      alt={image.alt ?? ""}
                      width={image.width ?? 1600}
                      height={image.height ?? 1200}
                      sizes="100vw"
                      className="h-full w-full object-cover md:h-auto md:object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </ScrollReveal>
        );
      })}
    </GridContainer>
  );
}
