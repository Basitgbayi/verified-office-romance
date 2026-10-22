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
    <Phone>
      <div className="relative flex flex-1 flex-col px-6 pt-10">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
            <Clock className="h-5 w-5" />
          </span>
          <span className="font-display text-xl font-semibold">Afterfive</span>
        </div>

        <div className="relative mx-auto mt-10 h-64 w-full">
          <img src={p3} alt="" className="absolute left-2 top-6 h-48 w-36 -rotate-6 rounded-3xl object-cover shadow-card" />
          <img src={p2} alt="" className="absolute right-2 top-6 h-48 w-36 rotate-6 rounded-3xl object-cover shadow-card" />
          <img src={p1} alt="" className="absolute left-1/2 top-0 h-56 w-40 -translate-x-1/2 rounded-3xl border-4 border-card object-cover shadow-card" />
          <span className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-card px-3 py-1.5 text-xs font-semibold shadow-soft">💼 2,400+ verified professionals</span>
        </div>

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
          <Link to="/verify" className="flex h-14 items-center justify-center gap-2 rounded-full bg-brand font-semibold text-primary-foreground shadow-card">
            <BadgeCheck className="h-5 w-5" /> Get started
          </Link>
          <Link to="/login" className="flex h-12 items-center justify-center rounded-full border bg-card font-semibold">
            I already have an account
          </Link>
        </div>
      </div>
    </Phone>
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
