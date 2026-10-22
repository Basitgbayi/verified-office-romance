import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Building2, ChevronRight, Crown, Eye, LogOut, Pencil, Settings, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { AppShell, IconChip, VerifiedBadge } from "@/components/AppShell";
import { me } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "My profile — Afterfive" },
      { name: "description", content: "Manage your Afterfive profile and preferences." },
      { property: "og:title", content: "My profile — Afterfive" },
      { property: "og:description", content: "Your Afterfive profile." },
    ],
  }),
  component: Profile,
});

const items = [
  { icon: Pencil, tone: "coral", label: "Edit profile", to: "/profile/edit" },
  { icon: SlidersHorizontal, tone: "sky", label: "Dating preferences", to: "/profile/preferences" },
  { icon: Building2, tone: "mint", label: "Workplace & privacy", to: "/profile/workplace" },
  { icon: Eye, tone: "berry", label: "Hide from colleagues", to: "/profile/hide" },
  { icon: Bell, tone: "sun", label: "Notifications", to: "/profile/notifications" },
  { icon: Settings, tone: "sky", label: "Settings", to: "/profile/settings" },
] as const;

function Profile() {
  return (
    <AppShell>
      <div className="px-5 pt-8 text-center">
        <div className="relative mx-auto h-28 w-28">
          <svg viewBox="0 0 100 100" className="absolute inset-0 -rotate-90">
            <circle cx="50" cy="50" r="47" className="fill-none stroke-border" strokeWidth="5" />
            <circle cx="50" cy="50" r="47" className="fill-none stroke-primary" strokeWidth="5" strokeDasharray="295" strokeDashoffset="59" strokeLinecap="round" />
          </svg>
          <img src={me.photo} alt={me.name} className="absolute inset-2 h-24 w-24 rounded-full object-cover" />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">80%</span>
        </div>
        <h1 className="mt-4 flex items-center justify-center gap-2 text-2xl font-semibold">{me.name}, {me.age} <VerifiedBadge /></h1>
        <p className="text-sm text-muted-foreground">{me.role} at {me.company}</p>
      </div>

      <div className="mx-5 mt-5 grid grid-cols-3 gap-3 text-center">
        {[["24", "Likes", "text-berry"], ["8", "Matches", "text-coral"], ["3", "Dates", "text-mint"]].map(([n, l, c]) => (
          <div key={l} className="rounded-2xl bg-card p-3 shadow-soft">
            <p className={`font-display text-2xl font-semibold ${c}`}>{n}</p>
            <p className="text-xs text-muted-foreground">{l}</p>
          </div>
        ))}
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3 rounded-3xl bg-brand p-4 text-primary-foreground shadow-card">
        <Crown className="h-8 w-8" />
        <div className="flex-1">
          <p className="font-bold">Go Gold</p>
          <p className="text-xs opacity-90">Unlimited likes, see who likes you, priority picks</p>
        </div>
        <ChevronRight />
      </div>

      <div className="mx-5 mt-4 flex items-center gap-3 rounded-2xl bg-sky-soft p-3">
        <ShieldCheck className="h-5 w-5 text-sky" />
        <p className="flex-1 text-xs font-medium">Workplace verified via work email · Andela</p>
      </div>

      <ul className="mx-5 mt-4 divide-y rounded-3xl bg-card px-3 shadow-soft">
        {items.map((it) => (
          <li key={it.label}>
            <Link to={it.to} className="flex items-center gap-3 py-3 transition active:opacity-60">
            <IconChip icon={it.icon} tone={it.tone} />
            <span className="flex-1 text-sm font-semibold">{it.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          </li>
        ))}
      </ul>

      <Link to="/" className="mx-5 mt-4 flex items-center justify-center gap-2 py-3 text-sm font-semibold text-destructive">
        <LogOut className="h-4 w-4" /> Log out
      </Link>
    </AppShell>
  );
}
