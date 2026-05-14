/**
 * soft-fail-wrapper.ts
 *
 * Pattern for any third-party SDK that needs an API key. When the key is
 * missing (e.g. local dev, CI, new contributor), the wrapper returns a
 * typed no-op that logs to console instead of crashing the build.
 *
 * Replace `resend` with whatever service you're wrapping.
 * The shape: real client if key present, stub if not. Both implement the same
 * typed interface so callers don't need to check.
 *
 * Why this matters:
 *  - App builds and runs without ANY third-party keys
 *  - New contributors can clone and `npm run dev` without env setup
 *  - CI doesn't need to populate 20 secrets to build
 *  - Tests can run against the stub without mocking
 */

// ---- Example: Resend email wrapper ----

type SendEmailInput = {
  to: string | string[];
  from?: string;
  subject: string;
  html?: string;
  text?: string;
};

type SendEmailResult = {
  ok: boolean;
  id?: string;
  error?: string;
};

interface EmailClient {
  sendEmail(input: SendEmailInput): Promise<SendEmailResult>;
}

// Real implementation: lazily import the SDK only if the key is present
class ResendEmailClient implements EmailClient {
  private apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  async sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
    const { Resend } = await import('resend');
    const client = new Resend(this.apiKey);
    try {
      const { data, error } = await client.emails.send({
        from: input.from ?? 'onboarding@resend.dev',
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
      });
      if (error) return { ok: false, error: error.message };
      return { ok: true, id: data?.id };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : 'unknown',
      };
    }
  }
}

// Stub implementation: logs to console, returns success
class StubEmailClient implements EmailClient {
  async sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
    console.log('[email/stub]', {
      to: input.to,
      subject: input.subject,
      // log the first 80 chars of body for debugging
      preview: (input.text ?? input.html ?? '').slice(0, 80),
    });
    return { ok: true, id: 'stub-' + Date.now() };
  }
}

// Factory: pick real or stub based on env
function makeEmailClient(): EmailClient {
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    return new ResendEmailClient(apiKey);
  }
  if (process.env.NODE_ENV === 'production') {
    console.warn('[email] RESEND_API_KEY missing in production - using stub.');
  }
  return new StubEmailClient();
}

// Export a singleton so callers can `import { email } from '@/lib/email/client'`
export const email: EmailClient = makeEmailClient();

// ---- Usage in any route or server action ----
//
// import { email } from '@/lib/email/client';
//
// await email.sendEmail({
//   to: user.email,
//   subject: 'Welcome',
//   text: 'Thanks for signing up.',
// });
//
// Whether the key is present or not, the call succeeds. In stub mode,
// it logs to the server console so you still see what would have been sent.
