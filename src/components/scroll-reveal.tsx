"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  viewportAmount?: number;
};

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 64 },
  down: { x: 0, y: -64 },
  left: { x: -64, y: 0 },
  right: { x: 64, y: 0 },
};

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  viewportAmount = 0.15,
}: Props) {
  const shouldReduceMotion = useReducedMotion();
  const offset = offsets[direction];

  return (
    <motion.div
      className={cn("min-w-0", className)}
      data-slot="scroll-reveal"
      initial={
        shouldReduceMotion
          ? false
          : { opacity: 0, scale: 0.94, filter: "blur(12px)", ...offset }
      }
      transition={{
        duration: shouldReduceMotion ? 0 : 0.8,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      viewport={{ amount: viewportAmount }}
      whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)", x: 0, y: 0 }}
    >
      {children}
    </motion.div>
  );
}
