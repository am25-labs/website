import type {
  ContentContactPayload,
  GeneralContactPayload,
  ServicesContactPayload,
  TurnstileVerificationResponse,
} from "@/types/domain";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

export function parseGeneralContactPayload(
  value: unknown,
): GeneralContactPayload | null {
  if (!isRecord(value)) {
    return null;
  }

  const { name, email, language, subject, message, token } = value;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(language) ||
    !isNonEmptyString(subject) ||
    !isNonEmptyString(message) ||
    !isNonEmptyString(token)
  ) {
    return null;
  }

  return { name, email, language, subject, message, token };
}

export function parseServicesContactPayload(
  value: unknown,
): ServicesContactPayload | null {
  if (!isRecord(value)) {
    return null;
  }

  const { name, email, language, service, message, token } = value;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(language) ||
    !isNonEmptyString(service) ||
    !isNonEmptyString(message) ||
    !isNonEmptyString(token)
  ) {
    return null;
  }

  return { name, email, language, service, message, token };
}

export function parseContentContactPayload(
  value: unknown,
): ContentContactPayload | null {
  if (!isRecord(value)) {
    return null;
  }

  const { name, email, language, token } = value;

  if (
    !isNonEmptyString(name) ||
    !isNonEmptyString(email) ||
    !isNonEmptyString(language) ||
    !isNonEmptyString(token)
  ) {
    return null;
  }

  return { name, email, language, token };
}

export async function verifyTurnstile(token: string): Promise<boolean> {
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET_KEY ?? "",
        response: token,
      }),
    },
  );

  const data = (await response.json()) as TurnstileVerificationResponse;
  return data.success === true;
}
