export type ContactFormMode = "general" | "services";

export interface ContactBasePayload {
  name: string;
  email: string;
  language: string;
  message: string;
  token: string;
}

export interface GeneralContactPayload extends ContactBasePayload {
  subject: string;
}

export interface ServicesContactPayload extends ContactBasePayload {
  service: string;
}

export type ContentContactPayload = Omit<ContactBasePayload, "message">;

export interface TurnstileVerificationResponse {
  success: boolean;
}

export interface AuditFormData {
  name: string;
  email: string;
  brand: string;
  website: string;
  instagram: string;
  sector: string;
  offer: string;
  audience: string;
  problem: string;
  goal: string;
  language: string;
}

export interface AuditFormPayload extends AuditFormData {
  token: string;
}
