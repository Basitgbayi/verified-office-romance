import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Briefcase, Building2, CalendarClock, ChevronDown, ChevronUp, Heart, MapPin, SlidersHorizontal, Star } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { AppShell, VerifiedBadge, IconChip } from "@/components/AppShell";
import { profiles, type Profile } from "@/lib/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Afterfive" },
      { name: "description", content: "Today's picks of verified professionals near you." },
      { property: "og:title", content: "Discover — Afterfive" },
      { property: "og:description", content: "Scroll through verified professionals." },
    ],
  }),
  component: Discover,
});

function Discover() {
  const [cycles, setCycles] = useState(8);
  const [likes, setLikes] = useState<Record<number, "like" | "super">>({});
  const [match, setMatch] = useState<Profile | null>(null);
  const [expandedKey, setExpandedKey] = useState<number | null>(null);
  const feedRef = useRef<HTMLDivElement>(null);

  const entries = useMemo(() => {
    const list: { p: Profile; key: number }[] = [];
    for (let i = 0; i < cycles * profiles.length; i++) list.push({ p: profiles[i % profiles.length]!, key: i });
    return list;
  }, [cycles]);

  const onScroll = () => {
    const el = feedRef.current;
    if (!el) return;
    if (el.scrollHeight - el.scrollTop - el.clientHeight < el.clientHeight * 2.5) {
      setCycles((c) => c + 2);
    }
  };

  const decide = (key: number, p: Profile, kind: "like" | "super") => {
    if (likes[key]) return;
    setLikes((l) => ({ ...l, [key]: kind }));
    if (kind === "super" || p.id === "amara" || p.id === "priya") setMatch(p);
  };

  return (
    <AppShell flush>
      <div className="flex h-full flex-col">
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

        <div
          ref={feedRef}
          onScroll={onScroll}
          className="min-h-0 flex-1 snap-y snap-mandatory overflow-y-auto overscroll-contain px-4 pb-4 pt-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {entries.map(({ p, key }) => (
            <Slide
              key={key}
              p={p}
              first={key === 0}
              liked={likes[key]}
              onLike={() => decide(key, p, "like")}
              onSuper={() => decide(key, p, "super")}
              expanded={expandedKey === key}
              onToggle={() => setExpandedKey((k) => (k === key ? null : key))}
            />
          ))}
        </div>
      </div>

      {match && <MatchModal p={match} onClose={() => setMatch(null)} />}
    </AppShell>
  );
}

function Slide({
  p,
  first,
  liked,
  onLike,
  onSuper,
  expanded,
  onToggle,
}: {
  p: Profile;
  first: boolean;
  liked?: "like" | "super" | undefined;
  onLike: () => void;
  onSuper: () => void;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="h-full snap-start pb-3">
      <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-card shadow-card">
        <img src={p.photo} alt={p.name} className="h-full w-full object-cover" draggable={false} />
        <div className="absolute inset-0 bg-photo-fade" />

        <div className="absolute left-4 top-4 flex flex-col items-start gap-2">
          <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold">🕐 {p.schedule.split(" ").slice(0, 2).join(" ")}</span>
          <span className="rounded-full bg-card/90 px-2.5 py-1 text-[11px] font-bold">📍 {p.distance}</span>
        </div>

        {liked && (
          <span className="absolute right-4 top-4 animate-in zoom-in-90 rounded-full bg-mint px-3 py-1 text-[11px] font-bold text-primary-foreground">
            {liked === "super" ? "⭐ Super liked" : "♥ Liked"}
          </span>
        )}

        {first && !liked && (
          <span className="absolute left-1/2 top-4 -translate-x-1/2 animate-bounce rounded-full bg-ink/50 px-3 py-1 text-[11px] font-semibold text-on-photo backdrop-blur">
            Scroll for more
          </span>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5 pb-6 text-on-photo">
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-semibold">{p.name}, {p.age}</h2>
            <VerifiedBadge />
          </div>
          <p className="mt-1 flex items-center gap-1.5 text-sm font-medium"><Briefcase className="h-4 w-4" /> {p.role} at {p.company}</p>
          {!expanded && <p className="mt-2 line-clamp-2 text-sm opacity-90">{p.bio}</p>}
          {!expanded && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.interests.map((i) => (
                <span key={i} className="rounded-full bg-on-photo/20 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">{i}</span>
              ))}
            </div>
          )}

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={onLike}
              aria-label={`Like ${p.name}`}
              className="grid h-14 w-14 place-items-center rounded-full bg-card/25 backdrop-blur transition active:scale-90"
            >
              <Heart
                className={`h-7 w-7 text-on-photo transition ${liked === "like" ? "scale-110 text-coral" : ""}`}
                fill={liked === "like" ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={onSuper}
              aria-label={`Super like ${p.name}`}
              className="grid h-14 w-14 place-items-center rounded-full bg-card/25 backdrop-blur transition active:scale-90"
            >
              <Star
                className={`h-7 w-7 text-on-photo transition ${liked === "super" ? "scale-110 text-sky" : ""}`}
                fill={liked === "super" ? "currentColor" : "none"}
              />
            </button>
            <button
              onClick={onToggle}
              className="ml-auto flex h-14 items-center gap-1.5 rounded-full bg-card/25 px-5 text-sm font-semibold text-on-photo backdrop-blur transition active:scale-90"
            >
              {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
              {expanded ? "Close" : "About"}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="absolute inset-x-0 bottom-0 max-h-[85%] space-y-3 overflow-y-auto rounded-t-[2rem] bg-card/95 p-5 backdrop-blur animate-in slide-in-from-bottom-8">
            <p className="text-xs font-semibold text-primary">{p.prompt.q}</p>
            <p className="font-display text-xl">{p.prompt.a}</p>
            <p className="text-sm text-muted-foreground">{p.bio}</p>
            <div className="space-y-3 rounded-3xl bg-muted p-4">
              <Row icon={Briefcase} tone="mint" label={p.role} />
              <Row icon={Building2} tone="sky" label={`${p.company} · ${p.industry}`} />
              <Row icon={CalendarClock} tone="sun" label={p.schedule} />
            </div>
            <button onClick={onToggle} className="h-11 w-full rounded-full border bg-card font-semibold">
              Back to photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ icon, tone, label }: { icon: any; tone: "mint" | "sky" | "sun"; label: string }) {
  return (
    <div className="flex items-center gap-3">
      <IconChip icon={icon} tone={tone} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
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
        <button onClick={onClose} className="mt-2 h-11 w-full rounded-full font-semibold text-muted-foreground">Keep scrolling</button>
      </div>
    </div>
  );
}
