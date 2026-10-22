import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Briefcase, Building2, CheckCircle2, Heart, IdCard, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { useState } from "react";
import { Phone, IconChip } from "@/components/AppShell";

export const Route = createFileRoute("/verify")({
  head: () => ({
    meta: [
      { title: "Verify your workplace — Afterfive" },
      { name: "description", content: "Confirm your employer to join a community of verified professionals." },
      { property: "og:title", content: "Verify your workplace — Afterfive" },
      { property: "og:description", content: "Workplace verification keeps Afterfive real." },
    ],
  }),
  component: Verify,
});

const methods = [
  { id: "email", icon: Mail, tone: "coral", title: "Work email", text: "Get a code at you@company.com" },
  { id: "linkedin", icon: Linkedin, tone: "sky", title: "LinkedIn", text: "Connect your current position" },
] as const;

const industries = [
  { id: "fintech", label: "💰 Fintech" },
  { id: "tech", label: "💻 Tech" },
  { id: "banking", label: "🏦 Banking" },
  { id: "legal", label: "⚖️ Legal" },
  { id: "consulting", label: "📊 Consulting" },
  { id: "health", label: "🏥 Health" },
  { id: "media", label: "🎬 Media" },
  { id: "other", label: "✨ Something else" },
];

function Verify() {
  const [step, setStep] = useState(0);
  const [method, setMethod] = useState<string>("email");
  const [code, setCode] = useState("");
  const [interest, setInterest] = useState("Everyone");
  const [ageMin, setAgeMin] = useState(24);
  const [ageMax, setAgeMax] = useState(40);
  const [distance, setDistance] = useState(15);
  const [picks, setPicks] = useState<string[]>([]);
  const nav = useNavigate();

  const togglePick = (id: string) =>
    setPicks((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <Phone>
      <div className="flex flex-1 flex-col px-6 pt-6">
        <div className="flex items-center justify-between">
          {step === 0 ? (
            <Link to="/" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></Link>
          ) : (
            <button onClick={() => setStep(step - 1)} className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></button>
          )}
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`h-1.5 rounded-full transition-all ${i <= step ? "w-8 bg-primary" : "w-4 bg-border"}`} />
            ))}
          </div>
          <span className="w-10" />
        </div>

        {step === 0 && (
          <>
            <h1 className="mt-8 text-3xl font-semibold">Where do you work?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Only professionals with a real 9-to-5 can join.</p>
            <div className="mt-6 space-y-3">
              <Field icon={Briefcase} tone="mint" label="Job title" placeholder="e.g. Financial Analyst" />
              <Field icon={Building2} tone="sky" label="Company" placeholder="e.g. Access Bank" />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <h1 className="mt-8 text-3xl font-semibold">Verify your workplace</h1>
            <p className="mt-2 text-sm text-muted-foreground">Pick one. Your employer never sees your profile.</p>
            <div className="mt-6 space-y-3">
              {methods.map((m) => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl border-2 bg-card p-4 text-left transition ${method === m.id ? "border-primary shadow-soft" : "border-transparent"}`}>
                  <IconChip icon={m.icon} tone={m.tone} />
                  <div className="flex-1">
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.text}</p>
                  </div>
                  {method === m.id && <CheckCircle2 className="h-5 w-5 text-primary" />}
                </button>
              ))}
            </div>
            <input className="mt-4 h-12 w-full rounded-2xl border bg-card px-4 text-sm outline-none focus:border-primary" placeholder="you@company.com" />
          </>
        )}

        {step === 2 && (
          <>
            <h1 className="mt-8 text-3xl font-semibold">Who are you looking for?</h1>
            <p className="mt-2 text-sm text-muted-foreground">Set your preferences. You can change these anytime.</p>

            <div className="mt-6 space-y-6">
              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Heart className="h-3.5 w-3.5 text-coral" /> Interested in</p>
                <div className="flex gap-2">
                  {["Everyone", "Women", "Men"].map((o) => (
                    <button key={o} onClick={() => setInterest(o)}
                      className={`flex-1 rounded-2xl border-2 py-3 text-sm font-semibold transition ${interest === o ? "border-primary bg-coral-soft/60 text-primary" : "border-transparent bg-card shadow-soft"}`}>
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-sun" /> Age range</p>
                <div className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
                  <select value={ageMin} onChange={(e) => setAgeMin(Number(e.target.value))}
                    className="h-10 flex-1 rounded-xl bg-muted px-3 text-sm font-semibold outline-none">
                    {Array.from({ length: 20 }, (_, i) => 21 + i).map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <span className="text-xs font-semibold text-muted-foreground">to</span>
                  <select value={ageMax} onChange={(e) => setAgeMax(Number(e.target.value))}
                    className="h-10 flex-1 rounded-xl bg-muted px-3 text-sm font-semibold outline-none">
                    {Array.from({ length: 22 }, (_, i) => 30 + i).map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  <span className="text-xs font-semibold text-muted-foreground">years</span>
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center justify-between text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5 text-sky" /> Maximum distance</span>
                  <span className="text-sm font-bold text-foreground">{distance} km</span>
                </p>
                <div className="rounded-2xl bg-card px-4 pb-2 pt-3 shadow-soft">
                  <input type="range" min={1} max={50} value={distance} onChange={(e) => setDistance(Number(e.target.value))}
                    className="w-full" style={{ accentColor: "var(--primary)" }} />
                  <div className="flex justify-between text-[10px] font-semibold text-muted-foreground"><span>1 km</span><span>50 km</span></div>
                </div>
              </div>

              <div>
                <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-muted-foreground"><Briefcase className="h-3.5 w-3.5 text-mint" /> Industries they work in</p>
                <div className="flex flex-wrap gap-2">
                  {industries.map((i) => {
                    const on = picks.includes(i.id);
                    return (
                      <button key={i.id} onClick={() => togglePick(i.id)}
                        className={`rounded-full border-2 px-3 py-2 text-xs font-semibold transition ${on ? "border-primary bg-mint-soft/60 text-primary" : "border-transparent bg-card shadow-soft"}`}>
                        {i.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h1 className="mt-8 text-3xl font-semibold">Enter the code</h1>
            <p className="mt-2 text-sm text-muted-foreground">We sent a 4-digit code to your work email. (Demo: any 4 digits)</p>
            <input value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 4))}
              inputMode="numeric" className="mt-6 h-16 w-full rounded-2xl border bg-card text-center font-display text-3xl tracking-[0.6em] outline-none focus:border-primary" placeholder="••••" />
          </>
        )}

        <div className="mt-auto pb-8 pt-8">
          <button
            disabled={step === 3 && code.length < 4}
            onClick={() => (step < 3 ? setStep(step + 1) : nav({ to: "/discover" }))}
            className="h-14 w-full rounded-full bg-brand font-semibold text-primary-foreground shadow-card disabled:opacity-40">
            {step < 3 ? "Continue" : "Verify & start matching"}
          </button>
        </div>
      </div>
    </Phone>
  );
}

function Field(props: { icon: any; tone: "mint" | "sky"; label: string; placeholder: string }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
      <IconChip icon={props.icon} tone={props.tone} />
      <div className="flex-1">
        <span className="text-xs font-semibold text-muted-foreground">{props.label}</span>
        <input className="w-full bg-transparent text-sm outline-none" placeholder={props.placeholder} />
      </div>
    </label>
  );
}
