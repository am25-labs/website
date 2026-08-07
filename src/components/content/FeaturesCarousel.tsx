"use client";

import { useRef } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export type CarouselSlide = {
  src: string;
  alt: string;
};

type FeaturesCarouselProps = {
  slides: CarouselSlide[];
};

export default function FeaturesCarousel({ slides }: FeaturesCarouselProps) {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
    }),
  );

  return (
    <Carousel
      className="mx-auto w-full max-w-8xl"
      opts={{ loop: true }}
      plugins={[plugin.current]}
    >
      <CarouselContent>
        {slides.map((slide) => (
          <CarouselItem key={slide.src}>
            <div className="px-0 py-4 md:px-14">
              <div className="relative aspect-video overflow-hidden border">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 1280px"
                  className="object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="hidden md:left-1 md:flex" />
      <CarouselNext className="hidden md:right-1 md:flex" />
    </Carousel>
  );
}
