"use client";

import { useEffect, useRef, useState } from "react";
import { AuditResult } from "./audit-result";
import TurnstileWrap from "@/components/contact/turnstile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScanSearchIcon } from "lucide-react";
import type {
  AuditFormData,
  AuditFormPayload,
  AuditResponse,
} from "@/types/domain";

interface AuditFormProps {
  onClose?: () => void;
  resetKey?: number;
}

export function AuditForm({ onClose, resetKey }: AuditFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<"en" | "es">("en");
  const [captchaToken, setCaptchaToken] = useState("");
  const [result, setResult] = useState<AuditResponse | null>(null);
  const [leadData, setLeadData] = useState<AuditFormData | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const leadData: AuditFormData = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        brand: formData.get("brand") as string,
        website: formData.get("website") as string,
        instagram: formData.get("instagram") as string,
        sector: formData.get("sector") as string,
        offer: formData.get("offer") as string,
        audience: formData.get("audience") as string,
        problem: formData.get("problem") as string,
        goal: formData.get("goal") as string,
        language,
      };
      const data: AuditFormPayload = {
        ...leadData,
        token: captchaToken,
      };

      const response = await fetch("/api/audit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = (await response.json()) as AuditResponse;

      if (response.ok) {
        setResult(result);
        setLeadData(leadData);
        setCaptchaToken("");
        formRef.current?.reset();
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setResult(null);
    setLeadData(null);
    setCaptchaToken("");
    formRef.current?.reset();
  }, [resetKey]);

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="uppercase">Brand Audit</DialogTitle>
        <DialogDescription>
          Complete the form to receive your personalized free quick brand audit
        </DialogDescription>
      </DialogHeader>

      {result ? (
        <AuditResult result={result} form={leadData} />
      ) : (
        <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-4">
          <div className="space-y-1">
            <Input
              id="name"
              name="name"
              placeholder="Full Name"
              required
              className="text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as "es" | "en")}
              >
                <SelectTrigger id="language" className="w-full text-sm">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Input
                id="brand"
                name="brand"
                placeholder="Brand Name"
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Input
                id="website"
                name="website"
                type="url"
                placeholder="Website URL"
                className="text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Input
                id="instagram"
                name="instagram"
                placeholder="Instagram user"
                required
                className="text-sm"
              />
            </div>

            <div className="space-y-1">
              <Input
                id="sector"
                name="sector"
                placeholder="Professional sector"
                required
                className="text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <Input
              id="offer"
              name="offer"
              placeholder="What do you offer?"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <Input
              id="audience"
              name="audience"
              placeholder="Who is your audience?"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <Input
              id="problem"
              name="problem"
              placeholder="What problem do you want to solve?"
              required
              className="text-sm"
            />
          </div>

          <div className="space-y-1">
            <Input
              id="goal"
              name="goal"
              placeholder="What is your goal?"
              required
              className="text-sm"
            />
          </div>

          <TurnstileWrap
            key={resetKey}
            onVerify={setCaptchaToken}
            onExpire={() => setCaptchaToken("")}
          />

          <Button
            type="submit"
            disabled={isLoading || !captchaToken}
            className="w-full font-bold uppercase"
          >
            <ScanSearchIcon />
            {isLoading ? "Auditing..." : "Start Audit"}
          </Button>
        </form>
      )}
    </DialogContent>
  );
}
