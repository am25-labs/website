"use client";

import { useState, useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  name: string;
  placeholder: string;
  options: string[];
  class?: string;
}

export default function SelectWrap({ name, placeholder, options }: Props) {
  const [value, setValue] = useState("");
  const hiddenRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const form = hiddenRef.current?.closest("form");
    if (!form) return;
    const handleReset = () => setValue("");
    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, []);

  return (
    <>
      <input ref={hiddenRef} type="hidden" name={name} value={value} />
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-full rounded-none group-data-[variant=light]:data-placeholder:text-plot group-data-[variant=light]:bg-input/10 group-data-[variant=light]:text-plot">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="group-data-[variant=light]:[--popover:#ffffff] group-data-[variant=light]:[--popover-foreground:var(--color-plot)] group-data-[variant=light]:[--accent:var(--color-plot)] group-data-[variant=light]:[--accent-foreground:#ffffff]">
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
