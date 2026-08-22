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
        <SelectTrigger className="w-full rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:data-placeholder:text-black group-data-[variant=light]:bg-input/10 group-data-[variant=light]:text-black">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className="group-data-[variant=yellow]:[--popover:oklch(0.145_0_0)] group-data-[variant=yellow]:[--popover-foreground:oklch(0.985_0_0)] group-data-[variant=yellow]:[--accent:oklch(0.269_0_0)] group-data-[variant=yellow]:[--accent-foreground:oklch(0.985_0_0)] group-data-[variant=light]:[--popover:oklch(0.145_0_0)] group-data-[variant=light]:[--popover-foreground:oklch(0.985_0_0)] group-data-[variant=light]:[--accent:oklch(0.269_0_0)] group-data-[variant=light]:[--accent-foreground:oklch(0.985_0_0)]">
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
