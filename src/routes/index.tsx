import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Phone, IconChip } from "@/components/AppShell";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Afterfive — Dating for busy professionals" },
      { name: "description", content: "Meet verified corporate professionals who value their time as much as you do." },
      { property: "og:title", content: "Afterfive — Dating for busy professionals" },
      { property: "og:description", content: "Workplace-verified dating for the 9-to-5 crowd." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <>
      <div className="lg:hidden">
        <Phone>
          <div className="relative flex flex-1 flex-col px-6 pt-10">
            <Logo />
            <Collage />
            <h1 className="mt-8 text-4xl font-semibold leading-tight">
              Love that fits <span className="text-primary italic">your calendar.</span>
            </h1>
            <p className="mt-3 text-muted-foreground">Dating for busy professionals. Every member's workplace is verified.</p>

            <div className="mt-6 space-y-3">
              <Feature icon={ShieldCheck} tone="sky" title="Workplace verified" text="Work email or ID checks for every member" />
              <Feature icon={Clock} tone="sun" title="Schedule-smart matches" text="Meet people free when you are" />
              <Feature icon={Sparkles} tone="berry" title="Curated daily picks" text="Quality over endless swiping" />
            </div>

            <div className="mt-auto space-y-3 pb-8 pt-8">
              <Cta />
            </div>
          </div>
        </Phone>
      </div>

      <div className="hidden min-h-dvh lg:grid lg:grid-cols-[1.05fr_1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-brand p-14 text-primary-foreground">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-ink/20 blur-3xl" />
          <div className="relative flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-card/15 backdrop-blur">
              <Clock className="h-5 w-5" />
            </span>
            <span className="font-display text-2xl font-semibold">Afterfive</span>
          </div>

          <div className="relative max-w-lg">
            <h1 className="font-display text-6xl font-semibold leading-[1.05] tracking-tight">
              Love that fits <span className="italic">your calendar.</span>
            </h1>
            <p className="mt-5 text-lg opacity-90">Dating for busy professionals. Every member's workplace is verified — so you only meet real people with real nine-to-fives.</p>
            <div className="mt-10 space-y-4">
              <BrandFeature icon={ShieldCheck} title="Workplace verified" text="Work email checks for every member" />
              <BrandFeature icon={Clock} title="Schedule-smart matches" text="Meet people free when you are" />
              <BrandFeature icon={Sparkles} title="Curated daily picks" text="Quality over endless swiping" />
            </div>
          </div>

          <p className="relative text-sm opacity-80">💼 2,400+ verified professionals · Lagos, Abuja & Port Harcourt</p>
        </div>

        <div className="relative flex items-center justify-center overflow-hidden bg-background p-14">
          <div className="w-full max-w-sm">
            <Collage />
            <div className="mt-10 space-y-3">
              <Cta />
            </div>
            <p className="mt-6 text-center text-xs text-muted-foreground">Free to join · Verification takes under 2 minutes</p>
          </div>
        </div>
      </div>
    </>
  );
}

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
        <Clock className="h-5 w-5" />
      </span>
      <span className="font-display text-xl font-semibold">Afterfive</span>
    </div>
  );
}

function Collage() {
  return (
    <div className="relative mx-auto mt-10 h-64 w-full max-w-sm">
      <img src={p3} alt="" className="absolute left-2 top-6 h-48 w-36 -rotate-6 rounded-3xl object-cover shadow-card" />
      <img src={p2} alt="" className="absolute right-2 top-6 h-48 w-36 rotate-6 rounded-3xl object-cover shadow-card" />
      <img src={p1} alt="" className="absolute left-1/2 top-0 h-56 w-40 -translate-x-1/2 rounded-3xl border-4 border-card object-cover shadow-card" />
      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold shadow-soft">💼 2,400+ verified professionals</span>
    </div>
  );
}

function Cta() {
  return (
    <>
      <Link to="/verify" className="flex h-14 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-primary-foreground shadow-card transition hover:opacity-95">
        <BadgeCheck className="h-5 w-5" /> Get started
      </Link>
      <Link to="/login" className="flex h-12 items-center justify-center rounded-full border bg-card font-semibold transition hover:bg-accent">
        I already have an account
      </Link>
    </>
  );
}

function Feature(props: { icon: any; tone: "sky" | "sun" | "berry"; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3">
      <IconChip icon={props.icon} tone={props.tone} />
      <div>
        <p className="text-sm font-semibold">{props.title}</p>
        <p className="text-xs text-muted-foreground">{props.text}</p>
      </div>
    </div>
  );
}

function BrandFeature({ icon: Icon, title, text }: { icon: any; title: string; text: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-card/15 backdrop-blur">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-sm opacity-80">{text}</p>
      </div>
    </div>
  );
}
