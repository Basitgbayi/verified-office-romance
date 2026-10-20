import { createFileRoute, Link } from "@tanstack/react-router";
import { Briefcase, Building2, CalendarClock, Heart, MapPin, RotateCcw, SlidersHorizontal, Star, X, Bell } from "lucide-react";
import { useRef, useState } from "react";
import { AppShell, VerifiedBadge, IconChip } from "@/components/AppShell";
import { profiles, type Profile } from "@/lib/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Lunchbreak" },
      { name: "description", content: "Today's picks of verified professionals near you." },
      { property: "og:title", content: "Discover — Lunchbreak" },
      { property: "og:description", content: "Swipe through verified professionals." },
    ],
  }),
  component: Discover,
});

function Discover() {
  const [index, setIndex] = useState(0);
  const [drag, setDrag] = useState(0);
  const [match, setMatch] = useState<Profile | null>(null);
  const [expanded, setExpanded] = useState(false);
  const start = useRef<number | null>(null);
  const current = profiles[index % profiles.length];
  const next = profiles[(index + 1) % profiles.length];

  const decide = (dir: "left" | "right" | "super") => {
    setDrag(dir === "left" ? -500 : 500);
    setTimeout(() => {
      if (dir !== "left" && (current.id === "amara" || current.id === "priya" || dir === "super")) setMatch(current);
      setIndex((i) => i + 1);
      setDrag(0);
      setExpanded(false);
    }, 220);
  };

  return (
    <AppShell>
      <header className="flex items-center justify-between px-5 pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Good morning, Chidi</p>
          <h1 className="text-2xl font-semibold">Today's picks</h1>
        </div>
        <div className="flex gap-2">
          <button className="grid h-10 w-10 place-items-center rounded-full bg-sun-soft text-sun"><Bell className="h-5 w-5" /></button>
          <button className="grid h-10 w-10 place-items-center rounded-full bg-sky-soft text-sky"><SlidersHorizontal className="h-5 w-5" /></button>
        </div>
      </header>

      <div className="flex gap-2 overflow-x-auto px-5 pt-4 text-xs font-semibold">
        {["All", "💰 Finance", "💻 Tech", "⚖️ Legal", "📊 Consulting", "🏥 Health"].map((c, i) => (
          <span key={c} className={`shrink-0 rounded-full px-3 py-1.5 ${i === 0 ? "bg-ink text-background" : "bg-card shadow-soft"}`}>{c}</span>
        ))}
      </div>

      <div className="relative mx-5 mt-4 h-[480px]">
        <Card p={next} className="scale-95 opacity-70" />
        <div
          className="absolute inset-0 touch-none transition-transform duration-200"
          style={{ transform: `translateX(${drag}px) rotate(${drag / 20}deg)` }}
          onPointerDown={(e) => (start.current = e.clientX)}
          onPointerMove={(e) => start.current !== null && setDrag(e.clientX - start.current)}
          onPointerUp={() => {
            start.current = null;
            if (drag > 100) decide("right");
            else if (drag < -100) decide("left");
            else setDrag(0);
          }}
          onClick={() => Math.abs(drag) < 5 && setExpanded((v) => !v)}
        >
          <Card p={current} expanded={expanded} />
          {drag > 40 && <Stamp text="LIKE" tone="border-mint text-mint" side="left-6 -rotate-12" />}
          {drag < -40 && <Stamp text="NOPE" tone="border-coral text-coral" side="right-6 rotate-12" />}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-4">
        <Action onClick={() => setIndex((i) => Math.max(0, i - 1))} className="h-12 w-12 bg-sun-soft text-sun"><RotateCcw className="h-5 w-5" /></Action>
        <Action onClick={() => decide("left")} className="h-16 w-16 bg-card text-coral shadow-card"><X className="h-8 w-8" strokeWidth={3} /></Action>
        <Action onClick={() => decide("super")} className="h-12 w-12 bg-sky-soft text-sky"><Star className="h-5 w-5" fill="currentColor" /></Action>
        <Action onClick={() => decide("right")} className="h-16 w-16 bg-brand text-primary-foreground shadow-card"><Heart className="h-8 w-8" fill="currentColor" /></Action>
      </div>

      {expanded && (
        <section className="mx-5 mt-6 space-y-3">
          <div className="rounded-3xl bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold text-primary">{current.prompt.q}</p>
            <p className="mt-1 font-display text-xl">{current.prompt.a}</p>
          </div>
          <div className="space-y-3 rounded-3xl bg-card p-5 shadow-soft">
            <Row icon={Briefcase} tone="mint" label={current.role} />
            <Row icon={Building2} tone="sky" label={`${current.company} · ${current.industry}`} />
            <Row icon={CalendarClock} tone="sun" label={current.schedule} />
          </div>
        </section>
      )}

      {match && <MatchModal p={match} onClose={() => setMatch(null)} />}
    </AppShell>
  );
}

function Card({ p, className = "", expanded }: { p: Profile; className?: string; expanded?: boolean }) {
  return (
    <div className={`absolute inset-0 overflow-hidden rounded-[2rem] bg-card shadow-card ${className}`}>
      <img src={p.photo} alt={p.name} className="h-full w-full object-cover" draggable={false} />
      <div className="absolute inset-0 bg-photo-fade" />
      <div className="absolute left-4 top-4 flex gap-2">
        <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold">🕐 {p.schedule.split(" ").slice(0, 2).join(" ")}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-5 text-on-photo">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-semibold">{p.name}, {p.age}</h2>
          <VerifiedBadge />
        </div>
        <p className="mt-1 flex items-center gap-1.5 text-sm font-medium"><Briefcase className="h-4 w-4" /> {p.role} at {p.company}</p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs opacity-80"><MapPin className="h-3.5 w-3.5" /> {p.distance}</p>
        {!expanded && <p className="mt-2 line-clamp-2 text-sm opacity-90">{p.bio}</p>}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.interests.map((i) => (
            <span key={i} className="rounded-full bg-on-photo/20 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">{i}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Stamp({ text, tone, side }: { text: string; tone: string; side: string }) {
  return <span className={`absolute top-10 ${side} rounded-xl border-4 px-3 py-1 font-display text-3xl font-bold ${tone}`}>{text}</span>;
}

function Action({ children, className, onClick }: { children: React.ReactNode; className: string; onClick: () => void }) {
  return <button onClick={onClick} className={`grid place-items-center rounded-full transition active:scale-90 ${className}`}>{children}</button>;
}

function Row({ icon, tone, label }: { icon: any; tone: "mint" | "sky" | "sun"; label: string }) {
  return <div className="flex items-center gap-3"><IconChip icon={icon} tone={tone} /><span className="text-sm font-medium">{label}</span></div>;
}

function MatchModal({ p, onClose }: { p: Profile; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-6 backdrop-blur-sm animate-in fade-in">
      <div className="w-full max-w-sm rounded-[2rem] bg-card p-6 text-center shadow-card animate-in zoom-in-90">
        <p className="text-4xl">🎉</p>
        <h2 className="mt-2 text-3xl font-semibold text-primary italic">It's a match!</h2>
        <p className="mt-1 text-sm text-muted-foreground">You and {p.name} liked each other.</p>
        <img src={p.photo} alt={p.name} className="mx-auto mt-5 h-32 w-32 rounded-full border-4 border-coral-soft object-cover" />
        <Link to="/chats/$id" params={{ id: p.id }} className="mt-6 flex h-12 items-center justify-center rounded-full bg-brand font-semibold text-primary-foreground">
          Say hello 👋
        </Link>
        <button onClick={onClose} className="mt-2 h-11 w-full rounded-full font-semibold text-muted-foreground">Keep swiping</button>
      </div>
    </div>
  );
}
