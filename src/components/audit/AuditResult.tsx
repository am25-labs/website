"use client";

import { useState } from "react";
import { CheckIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { AuditFormData, AuditResponse } from "@/types/domain";

interface AuditResultProps {
  result: AuditResponse;
  form: AuditFormData | null;
}

export function AuditResult({ result, form }: AuditResultProps) {
  const { lead, diagnosis } = result;
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );

  const requestAudit = async () => {
    if (!form) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/audit/lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          form,
          audit: result,
        }),
      });

      setStatus(response.ok ? "sent" : "error");
    } catch (error) {
      console.error("Lead request error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="max-h-[70dvh] overflow-y-auto -pr-2 space-y-6">
      <div>
        <h3 className="mt-4 text-xl font-bold uppercase">{lead.brand}</h3>

        <p className="mt-1 text-sm opacity-70">{lead.website}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <ScoreCard label="Clarity" value={diagnosis.clarity} />
        <ScoreCard label="Trust" value={diagnosis.trust} />
        <ScoreCard label="Consistency" value={diagnosis.consistency} />
      </div>

      <Section title="Evidence" content={diagnosis.evidence} />
      <Section title="Summary" content={diagnosis.summary} />
      <Section title="Recommendation" content={diagnosis.recommendation} />
      <Section title="Next Step" content={diagnosis.nextStep} />

      <div className="border p-4">
        <p className="text-sm font-semibold uppercase">Want a deeper review?</p>
        <p className="mt-2 text-sm opacity-70">
          Turn this quick audit into a clear action plan for your brand.
        </p>

        <Button
          type="button"
          onClick={requestAudit}
          disabled={!form || status === "loading" || status === "sent"}
          className="mt-4 w-full font-bold uppercase"
        >
          {status === "sent" ? <CheckIcon /> : <SendIcon />}
          {status === "loading"
            ? "Sending..."
            : status === "sent"
              ? "Request Sent"
              : "Request Full Audit"}
        </Button>

        {status === "error" ? (
          <p className="mt-3 text-sm font-medium text-destructive">
            We could not send your request. Please try again.
          </p>
        ) : null}
      </div>
    </div>
  );
}

interface ScoreCardProps {
  label: string;
  value: number;
}

function ScoreCard({ label, value }: ScoreCardProps) {
  return (
    <div className="border p-3 text-center">
      <p className="text-lg font-bold">{value}/5</p>
      <p className="mt-1 text-[10px] font-bold uppercase opacity-60">{label}</p>
    </div>
  );
}

interface SectionProps {
  title: string;
  content: string;
}

function Section({ title, content }: SectionProps) {
  return (
    <section>
      <h4 className="text-sm font-bold uppercase">{title}</h4>
      <p className="mt-2 text-sm leading-relaxed opacity-80">{content}</p>
    </section>
  );
}
