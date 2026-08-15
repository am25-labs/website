"use client";

import { useState } from "react";
import { SendIcon } from "lucide-react";
import TurnstileWrap from "@/components/contact/Turnstile";
import { AlertWrap } from "@/components/ui/custom/AlertWrap";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { emailRegex, nameRegex } from "@/lib/validation";
import type { Locale } from "@/lib/i18n";

interface Props {
  className?: string;
  locale: Locale;
}

interface FormState {
  name: string;
  email: string;
  language: string;
}

const LANGUAGE_OPTIONS = ["Spanish", "English"];

function getInitialState(): FormState {
  return {
    name: "",
    email: "",
    language: "",
  };
}

export default function AccessDialog({ className, locale }: Props) {
  const [form, setForm] = useState<FormState>(getInitialState);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const text = locale === "es" ? {
    request: "Solicitar acceso anticipado", description: "Únete al grupo de acceso anticipado de AM25 Content Hub", fullName: "Nombre completo", language: "Idioma", sending: "Enviando...", send: "Enviar solicitud",
  } : {
    request: "Request Early Access", description: "Join the early access group for AM25 Content Hub", fullName: "Full Name", language: "Language", sending: "Sending...", send: "Send Request",
  };

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(getInitialState());
    setCaptchaToken("");
  }

  function validateForm() {
    if (!nameRegex.test(form.name)) {
      return "Nombre inválido.";
    }

    if (!emailRegex.test(form.email)) {
      return "Correo inválido.";
    }

    if (!form.language) {
      return "Selecciona un idioma.";
    }

    if (!captchaToken) {
      return "Por favor completa el captcha.";
    }

    return null;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setStatus({ type: "error", text: validationError });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          language: form.language,
          token: captchaToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          text: result.error || "Error al enviar. Intenta de nuevo.",
        });
        return;
      }

      setStatus({ type: "success", text: "Solicitud enviada con éxito." });
      resetForm();
    } catch {
      setStatus({ type: "error", text: "Error de red. Intenta más tarde." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          type="button"
          size="lg"
          className={cn("font-bold uppercase", className)}
        >
          <SendIcon />
          {text.request}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-none sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>{text.request}</DialogTitle>
          <DialogDescription>
            {text.description}
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input
                  id="content-name"
                  name="name"
                  placeholder={text.fullName}
                  className="rounded-none"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </Field>

              <Field>
                <Input
                  id="content-email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  className="rounded-none"
                  autoComplete="email"
                  value={form.email}
                  onChange={(event) =>
                    updateField("email", event.target.value)
                  }
                />
              </Field>

              <Field>
                <Select
                  value={form.language}
                  onValueChange={(value) => updateField("language", value)}
                >
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue placeholder={text.language} />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <TurnstileWrap
                  onVerify={(token) => setCaptchaToken(token)}
                  onExpire={() => setCaptchaToken("")}
                />
              </Field>

              {status?.type === "success" ? (
                <AlertWrap variant="success" title={status.text} />
              ) : null}

              {status?.type === "error" ? (
                <AlertWrap variant="destructive" title={status.text} />
              ) : null}
            </FieldGroup>
          </FieldSet>

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              className="font-bold uppercase"
              disabled={isSubmitting}
            >
              <SendIcon />
              <span>{isSubmitting ? text.sending : text.send}</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
