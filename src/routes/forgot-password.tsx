import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, MailCheck } from "lucide-react";
import { useState } from "react";
import { Phone } from "@/components/AppShell";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Forgot password — Afterfive" },
      { name: "description", content: "Reset your Afterfive password with the email you signed up with." },
      { property: "og:title", content: "Forgot password — Afterfive" },
      { property: "og:description", content: "Reset your Afterfive password." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    setError("");
    setSent(true);
  };

  return (
    <Phone>
      <div className="flex flex-1 flex-col px-6 pt-6">
        <Link to="/login" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></Link>

        {sent ? (
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <div className="grid h-20 w-20 place-items-center rounded-3xl bg-mint-soft shadow-soft">
              <MailCheck className="h-9 w-9 text-mint" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold">Check your email</h1>
            <p className="mt-2 max-w-xs text-sm text-muted-foreground">
              We sent a reset link to <span className="font-semibold text-foreground">{email}</span>. Open it to set a new password.
            </p>
            <Link to="/reset-password"
              className="mt-8 h-14 w-full rounded-full bg-brand py-3.5 text-center text-sm font-bold text-primary-foreground shadow-card active:scale-[0.98]">
              Open reset link
            </Link>
            <Link to="/login" className="mt-4 text-sm font-semibold text-primary">Back to log in</Link>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-1 flex-col">
            <h1 className="mt-8 text-3xl font-semibold">Forgot password</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter the work email you signed up with and we'll send you a reset link.</p>

            <div className="mt-6">
              <label className="block rounded-2xl bg-card p-3 shadow-soft">
                <span className="text-xs font-semibold text-muted-foreground">Email</span>
                <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none" placeholder="you@company.com" />
              </label>
              {error && <p className="mt-2 text-sm font-semibold text-destructive">{error}</p>}
            </div>

            <div className="mt-auto space-y-3 pb-8 pt-8">
              <button type="submit"
                className="h-14 w-full rounded-full bg-brand font-semibold text-primary-foreground shadow-card active:scale-[0.98]">
                Send reset link
              </button>
              <p className="text-center text-sm text-muted-foreground">
                Remembered it? <Link to="/login" className="font-semibold text-primary">Log in</Link>
              </p>
            </div>
          </form>
        )}
      </div>
    </Phone>
  );
}
