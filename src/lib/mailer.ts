import { ServerClient } from "postmark";

const clients = new Map<string, ServerClient>();

function requireEnv(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing email configuration: ${name}`);
  return value;
}

function getClient(token: string) {
  let client = clients.get(token);
  if (!client) {
    client = new ServerClient(token);
    clients.set(token, client);
  }
  return client;
}

export async function sendMail({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const token = requireEnv("POSTMARK_SERVER_TOKEN");
  const from = requireEnv("POSTMARK_FROM");
  const stream = process.env.POSTMARK_TRANSACTIONAL_STREAM?.trim() || "outbound";

  try {
    const result = await getClient(token).sendEmail({
      From: `"AM25" <${from}>`,
      To: to,
      Subject: subject,
      TextBody: text,
      MessageStream: stream,
    });
    if (result.ErrorCode !== 0) throw new Error(result.Message);
    return result;
  } catch (cause) {
    throw new Error("Email delivery failed", { cause });
  }
}
