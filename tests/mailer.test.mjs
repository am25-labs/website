import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";

function setup(t, overrides = {}, failure) {
  const config = {
    POSTMARK_SERVER_TOKEN: " server-token ",
    POSTMARK_FROM: " sender@example.test ",
    POSTMARK_TRANSACTIONAL_STREAM: undefined,
    ...overrides,
  };
  const original = Object.fromEntries(Object.keys(config).map((key) => [key, process.env[key]]));
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  t.after(() => {
    for (const [key, value] of Object.entries(original)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });

  const clients = [];
  const calls = [];
  const response = { ErrorCode: 0, Message: "OK", MessageID: "message-id" };
  class ServerClient {
    constructor(token) {
      clients.push(token);
    }
    async sendEmail(message) {
      calls.push(message);
      if (failure) throw failure;
      return response;
    }
  }

  const source = readFileSync(new URL("../src/lib/mailer.ts", import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  });
  const compiled = { exports: {} };
  new Function("require", "module", "exports", outputText)(
    (name) => {
      assert.equal(name, "postmark");
      return { ServerClient };
    }, compiled, compiled.exports,
  );
  return { ...compiled.exports, clients, calls, response };
}

const message = {
  to: "contact@example.test",
  subject: "Service Inquiry from Ana",
  text: "Name: Ana\n\nInformación del proyecto",
};

test("API delivery preserves recipients, subject and plain text and reuses the client", async (t) => {
  const mailer = setup(t);
  assert.equal(await mailer.sendMail(message), mailer.response);
  assert.deepEqual(mailer.calls[0], {
    From: '"AM25" <sender@example.test>',
    To: message.to,
    Subject: message.subject,
    TextBody: message.text,
    MessageStream: "outbound",
  });
  await mailer.sendMail(message);
  assert.deepEqual(mailer.clients, ["server-token"]);
});

test("transactional streams support an explicit ID and a blank value defaults to outbound", async (t) => {
  const mailer = setup(t, { POSTMARK_TRANSACTIONAL_STREAM: " website " });
  await mailer.sendMail(message);
  assert.equal(mailer.calls[0].MessageStream, "website");
  process.env.POSTMARK_TRANSACTIONAL_STREAM = " ";
  await mailer.sendMail(message);
  assert.equal(mailer.calls[1].MessageStream, "outbound");
});

test("missing or blank configuration fails before contacting Postmark", async (t) => {
  const mailer = setup(t, { POSTMARK_SERVER_TOKEN: undefined });
  await assert.rejects(mailer.sendMail(message), /POSTMARK_SERVER_TOKEN/);
  process.env.POSTMARK_SERVER_TOKEN = " ";
  await assert.rejects(mailer.sendMail(message), /POSTMARK_SERVER_TOKEN/);
  process.env.POSTMARK_SERVER_TOKEN = "server-token";
  delete process.env.POSTMARK_FROM;
  await assert.rejects(mailer.sendMail(message), /POSTMARK_FROM/);
  process.env.POSTMARK_FROM = " ";
  await assert.rejects(mailer.sendMail(message), /POSTMARK_FROM/);
  assert.deepEqual(mailer.clients, []);
  assert.deepEqual(mailer.calls, []);
});

test("API failures preserve their original cause", async (t) => {
  const failure = new Error("Provider rejected the message");
  const mailer = setup(t, {}, failure);
  await assert.rejects(mailer.sendMail(message),
    (error) => error.message === "Email delivery failed" && error.cause === failure);
});

test("Postmark error responses are not treated as successful deliveries", async (t) => {
  const mailer = setup(t);
  mailer.response.ErrorCode = 300;
  mailer.response.Message = "Invalid email request";
  await assert.rejects(mailer.sendMail(message),
    (error) => error.message === "Email delivery failed" && error.cause.message === "Invalid email request");
});
