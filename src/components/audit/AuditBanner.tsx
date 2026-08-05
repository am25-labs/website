"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScanSearchIcon } from "lucide-react";
import { AuditForm } from "./AuditForm";

export function AuditBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const handleOpenChange = (isOpen: boolean) => {
    setIsOpen(isOpen);
    if (!isOpen) {
      setResetKey((key) => key + 1);
    }
  };

  return (
    <>
      <div className="w-full bg-primary-foreground mb-20">
        <div className="mx-auto max-w-4xl px-4 py-12">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-4">
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold sm:text-2xl uppercase">
                Free Brand Audit
              </h2>
              <p className="mt-2 text-sm opacity-90 sm:text-base">
                Discover how to improve your brand presence in minutes
              </p>
            </div>

            <Button
              type="submit"
              onClick={() => setIsOpen(true)}
              size="lg"
              className="font-bold uppercase"
            >
              <ScanSearchIcon />
              <span>Start Now</span>
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <AuditForm onClose={() => setIsOpen(false)} resetKey={resetKey} />
      </Dialog>
    </>
  );
}
