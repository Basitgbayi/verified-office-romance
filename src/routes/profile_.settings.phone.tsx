import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, MessageSquareDot, Smartphone } from "lucide-react";
import { useState } from "react";
import { Section, SubPage, fieldClass } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings/phone")({
  head: () => ({
    meta: [
      { title: "Phone number — Afterfive" },
      { name: "description", content: "Change the phone number linked to your Afterfive account." },
      { property: "og:title", content: "Phone number — Afterfive" },
      { property: "og:description", content: "Change your Afterfive phone number." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PhonePage,
});

function PhonePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"form" | "code" | "done">("form");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  const digits = phone.replace(/\D/g, "").length;
  const valid = digits >= 7 && digits <= 13;

  const send = () => {
    if (!valid) { setError("Enter a valid phone number"); return; }
    setError("");
    setStep("code");
  };

  const verify = () => {
    if (code.length !== 4) { setError("Enter the 4-digit code"); return; }
    setError("");
    setStep("done");
  };

  return (
    <SubPage title="Phone number" subtitle="Keep your account reachable" backTo="/profile/settings">
      {step === "form" && (
        <>
          <Section title="Current number">
            <div className="flex items-center gap-3 py-1">
              <span className="grid h-10 w-10 place-items-center rounded-2xl bg-mint-soft text-mint"><Smartphone className="h-5 w-5" /></span>
              <span className="flex-1 text-sm font-semibold">+234 •••• 4821</span>
              <span className="rounded-full bg-mint-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-mint">Verified</span>
            </div>
          </Section>
          <Section title="New number">
            <input
              type="tel"
              value={phone}
              onChange={(e) => { setPhone(e.target.value); setError(""); }}
              placeholder="+234 800 000 0000"
              className={fieldClass}
            />
            <p className="pt-2 text-xs text-muted-foreground">We'll text you a 4-digit code to confirm it's really you. Your matches won't see this number.</p>
            {error && <p className="pt-2 text-xs font-semibold text-destructive">{error}</p>}
            <button
              onClick={send}
              disabled={!valid}
              className="mt-4 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground shadow-card disabled:opacity-40"
            >
              Send code
            </button>
          </Section>
        </>
      )}

      {step === "code" && (
        <Section title="Confirm your number">
          <div className="flex items-center gap-3 pb-4">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-sun-soft text-sun"><MessageSquareDot className="h-5 w-5" /></span>
            <p className="flex-1 text-xs text-muted-foreground">Enter the 4-digit code we sent to {phone}</p>
          </div>
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            value={code}
            onChange={(e) => { setCode(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(""); }}
            placeholder="• • • •"
            className={`${fieldClass} text-center font-display text-2xl tracking-[0.5em]`}
          />
          {error && <p className="pt-2 text-xs font-semibold text-destructive">{error}</p>}
          <button onClick={verify} disabled={code.length !== 4} className="mt-4 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground shadow-card disabled:opacity-40">
            Verify number
          </button>
          <button onClick={() => { setStep("form"); setCode(""); }} className="mt-3 w-full py-1 text-xs font-semibold text-muted-foreground">
            Change number
          </button>
        </Section>
      )}

      {step === "done" && (
        <Section>
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-mint-soft text-mint"><BadgeCheck className="h-8 w-8" /></span>
            <p className="font-display text-lg font-semibold">Number updated</p>
            <p className="max-w-[240px] text-xs text-muted-foreground">Your account now uses {phone}. It stays private — matches only see what's on your profile.</p>
            <button onClick={() => navigate({ to: "/profile/settings" })} className="mt-2 w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground shadow-card">
              Done
            </button>
          </div>
        </Section>
      )}
    </SubPage>
  );
}
