"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

type FilterOption = {
  id: string;
  label: string;
  value: string;
};

interface ContentFilterProps<T> {
  title?: string;
  options: FilterOption[];
  items: T[];
  matches: (item: T, activeValue: string | null) => boolean;
  children: (filteredItems: T[]) => React.ReactNode;
  allLabel?: string;
}

export default function ContentFilter<T>({
  title,
  options,
  items,
  matches,
  children,
  allLabel = "All",
}: ContentFilterProps<T>) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const filteredItems = items.filter((item) => matches(item, active));
  const activeLabel =
    options.find((option) => option.value === active)?.label ?? allLabel;

  const handleSelect = (value: string | null) => {
    setActive(value);
    setOpen(false);
  };

  return (
    <>
      {title ? (
        <GridContainer>
          <div className="col-span-full">
            <h1 className="text-3xl font-bold uppercase md:text-4xl">{title}</h1>
          </div>
        </GridContainer>
      ) : null}

      <Collapsible open={open} onOpenChange={setOpen} className="border-b md:hidden">
        <CollapsibleTrigger className="flex w-full items-center justify-between px-5 py-3">
          <span className="text-sm font-bold uppercase">{activeLabel}</span>
          <ChevronDownIcon className={clsx("size-4", open && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t">
          <div className="flex flex-col px-5 py-2">
            <button
              onClick={() => handleSelect(null)}
              className={clsx(
                "py-2 text-left text-sm uppercase",
                active === null ? "font-bold" : "text-muted-foreground",
              )}
            >
              {allLabel}
            </button>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option.value)}
                className={clsx(
                  "py-2 text-left text-sm",
                  active === option.value ? "font-bold" : "text-muted-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      <GridContainer className="my-0 hidden md:block">
        <div className="col-span-full border-b">
          <div className="mx-auto flex w-full flex-wrap items-center gap-6 py-4">
            <button
              onClick={() => setActive(null)}
              className={clsx(
                "cursor-pointer text-sm uppercase",
                active === null
                  ? "font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {allLabel}
            </button>
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => setActive(option.value)}
                className={clsx(
                  "cursor-pointer text-sm transition-all duration-200",
                  active === option.value
                    ? "font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </GridContainer>

      {children(filteredItems)}
    </>
  );
}
