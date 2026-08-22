"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, SendIcon } from "lucide-react";
import TurnstileWrap from "@/components/contact/turnstile";
import { AlertWrap } from "@/components/ui/custom/alert-wrap";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
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
import { Textarea } from "@/components/ui/textarea";
import ScrollReveal from "@/components/scroll-reveal";
import { emailRegex, nameRegex } from "@/lib/validation";
import type { ContactFormMode } from "@/types/domain";
import { withLocale, type Locale } from "@/lib/i18n";

const LANGUAGE_OPTIONS = ["Spanish", "English"];
const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Technical Support",
  "Collaboration",
  "Other Message",
];
const SERVICE_OPTIONS = [
  "Graphic Design",
  "Web/Dev",
  "Multimedia",
  "Outside our scope",
];

interface ContactFormProps {
  mode: ContactFormMode;
  locale: Locale;
}

interface FormState {
  name: string;
  email: string;
  language: string;
  subjectOrService: string;
  message: string;
  acceptedPrivacy: boolean;
}

function getInitialState(): FormState {
  return {
    name: "",
    email: "",
    language: "",
    subjectOrService: "",
    message: "",
    acceptedPrivacy: true,
  };
}

export default function ContactForm({ mode, locale }: ContactFormProps) {
  const [form, setForm] = useState<FormState>(getInitialState);
  const [captchaToken, setCaptchaToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const isGeneral = mode === "general";
  const endpoint = isGeneral ? "/api/contact/general" : "/api/contact/services";
  const text = locale === "es" ? {
    contact: "¿Cómo puedo contactarte?", contactDescription: "Para responder tus preguntas necesitamos poder contactarte", fullName: "Nombre completo", language: "Idioma", chooseSubject: "Elige un asunto", chooseService: "Elige un servicio", subjectDescription: "El motivo principal de tu mensaje:", serviceDescription: "El servicio principal que te interesa:", subject: "Asunto", service: "Servicio", message: "Escribe tu mensaje aquí", privacy: "He leído y acepto la", privacyLink: "Política de privacidad", sending: "Enviando...", send: "Enviar", cancel: "Cancelar",
  } : {
    contact: "How can I contact you?", contactDescription: "To answer your questions, we need to be able to contact you", fullName: "Full Name", language: "Language", chooseSubject: "Choose a subject", chooseService: "Choose a service", subjectDescription: "The main reason for your message:", serviceDescription: "The main service that interests you:", subject: "Subject", service: "Service", message: "Type your message here", privacy: "I have read and agree to the", privacyLink: "Privacy Policy", sending: "Sending...", send: "Send", cancel: "Cancel",
  };
  const title = isGeneral ? text.chooseSubject : text.chooseService;
  const description = isGeneral
    ? text.subjectDescription
    : text.serviceDescription;
  const placeholder = isGeneral ? text.subject : text.service;
  const options = isGeneral
    ? locale === "es" ? ["Consulta general", "Soporte técnico", "Colaboración", "Otro mensaje"] : SUBJECT_OPTIONS
    : locale === "es" ? ["Diseño gráfico", "Web/Desarrollo", "Multimedia", "Fuera de nuestro alcance"] : SERVICE_OPTIONS;

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function resetForm() {
    setForm(getInitialState());
    setCaptchaToken("");
    setStatus(null);
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

    if (!form.subjectOrService) {
      return isGeneral ? "Selecciona un asunto." : "Selecciona un servicio.";
    }

    const messageLength = form.message.trim().length;
    if (messageLength < 10 || messageLength > 1000) {
      return "El mensaje debe tener al menos 10 caracteres y no más de 1000.";
    }

    if (!form.acceptedPrivacy) {
      return "Debes aceptar la política de privacidad.";
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
      const payload = {
        name: form.name,
        email: form.email,
        language: form.language,
        message: form.message,
        token: captchaToken,
        ...(isGeneral
          ? { subject: form.subjectOrService }
          : { service: form.subjectOrService }),
      };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          text: result.error || "Error al enviar. Intenta de nuevo.",
        });
        return;
      }

      setStatus({ type: "success", text: "Enviado con éxito." });
      resetForm();
    } catch {
      setStatus({ type: "error", text: "Error de red. Intenta más tarde." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <ScrollReveal>
        <Card className="gap-6 overflow-hidden rounded-2xl border-foreground/10 bg-card py-6 text-sm text-card-foreground shadow-none ring-0 group-data-[variant=yellow]:bg-am-y group-data-[variant=yellow]:text-black">
        <div className="px-6">
          <FieldSet>
            <div className="flex flex-col gap-2">
              <FieldLegend className="mb-0 font-bold uppercase">
                {text.contact}
              </FieldLegend>
              <FieldDescription>
                {text.contactDescription}
              </FieldDescription>
            </div>

            <FieldGroup>
              <Field className="-mb-3">
                <Input
                  name="name"
                  placeholder={text.fullName}
                  className="rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:placeholder:text-black"
                  autoComplete="name"
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                />
              </Field>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Field>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:placeholder:text-black"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField("email", event.target.value)}
                  />
                </Field>

                <Field>
                  <Select
                    value={form.language}
                    onValueChange={(value) => updateField("language", value)}
                  >
                    <SelectTrigger className="w-full rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:data-placeholder:text-black">
                    <SelectValue placeholder={text.language} />
                    </SelectTrigger>
                    <SelectContent className="group-data-[variant=yellow]:[--popover:oklch(0.145_0_0)] group-data-[variant=yellow]:[--popover-foreground:oklch(0.985_0_0)] group-data-[variant=yellow]:[--accent:oklch(0.269_0_0)] group-data-[variant=yellow]:[--accent-foreground:oklch(0.985_0_0)]">
                      {LANGUAGE_OPTIONS.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>

          <FieldSet className="mt-8">
            <div className="flex flex-col gap-2">
              <FieldLegend className="mb-0 font-bold uppercase">
                {title}
              </FieldLegend>
              <FieldDescription>{description}</FieldDescription>
            </div>

            <FieldGroup>
              <Field className="-mb-3">
                <Select
                  value={form.subjectOrService}
                  onValueChange={(value) =>
                    updateField("subjectOrService", value)
                  }
                >
                  <SelectTrigger className="w-full rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:data-placeholder:text-black">
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent className="group-data-[variant=yellow]:[--popover:oklch(0.145_0_0)] group-data-[variant=yellow]:[--popover-foreground:oklch(0.985_0_0)] group-data-[variant=yellow]:[--accent:oklch(0.269_0_0)] group-data-[variant=yellow]:[--accent-foreground:oklch(0.985_0_0)]">
                    {options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              <Field>
                <Textarea
                  name="message"
                  placeholder={text.message}
                  className="rounded-none group-data-[variant=yellow]:bg-input/10 group-data-[variant=yellow]:text-black group-data-[variant=yellow]:placeholder:text-black"
                  value={form.message}
                  onChange={(event) => updateField("message", event.target.value)}
                />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox
                  checked={form.acceptedPrivacy}
                  onCheckedChange={(checked) =>
                    updateField("acceptedPrivacy", checked === true)
                  }
                />
                <FieldLabel className="flex-wrap gap-1.5 text-xs group-data-[variant=yellow]:text-black">
                  {text.privacy}
                  <Link
                    href={withLocale(locale, "/privacy")}
                    target="_blank"
                    rel="noopener"
                    className="inline-flex items-center hover:font-bold"
                  >
                    {text.privacyLink}
                    <ArrowUpRightIcon size={16} className="shrink-0" />
                  </Link>
                </FieldLabel>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <TurnstileWrap
                onVerify={(token) => setCaptchaToken(token)}
                onExpire={() => setCaptchaToken("")}
              />
            </FieldGroup>

            {status?.type === "success" ? (
              <AlertWrap variant="success" title={status.text} />
            ) : null}

            {status?.type === "error" ? (
              <AlertWrap variant="destructive" title={status.text} />
            ) : null}
          </FieldSet>
        </div>

        <div className="flex items-center gap-3 px-6">
          <Button
            type="submit"
            size="lg"
            className="font-bold uppercase"
            disabled={isSubmitting}
          >
            <SendIcon />
            <span>{isSubmitting ? text.sending : text.send}</span>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="font-bold uppercase"
            onClick={resetForm}
            disabled={isSubmitting}
          >
            {text.cancel}
          </Button>
        </div>
        </Card>
      </ScrollReveal>
    </form>
  );
}
