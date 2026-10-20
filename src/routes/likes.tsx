import { createFileRoute } from "@tanstack/react-router";
import { Crown, Heart } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { profiles } from "@/lib/data";

export const Route = createFileRoute("/likes")({
  head: () => ({
    meta: [
      { title: "Likes — Lunchbreak" },
      { name: "description", content: "See the professionals who liked your profile." },
      { property: "og:title", content: "Likes — Lunchbreak" },
      { property: "og:description", content: "People who liked you on Lunchbreak." },
    ],
  }),
  component: Likes,
});

function Likes() {
  return (
    <AppShell>
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-semibold">Likes you</h1>
        <p className="text-sm text-muted-foreground">{profiles.length} professionals are interested</p>
      </header>
      <div className="mx-5 mt-4 flex items-center gap-3 rounded-3xl bg-sun-soft p-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-sun text-on-photo"><Crown className="h-5 w-5" /></span>
        <div className="flex-1">
          <p className="text-sm font-bold">Lunchbreak Gold</p>
          <p className="text-xs text-muted-foreground">See everyone who likes you instantly</p>
        </div>
        <button className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-background">Upgrade</button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 px-5">
        {profiles.map((p, i) => (
          <div key={p.id} className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-soft">
            <img src={p.photo} alt={p.name} loading="lazy" className={`h-full w-full object-cover ${i > 1 ? "blur-md" : ""}`} />
            <div className="absolute inset-0 bg-photo-fade" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-on-photo">
              <p className="font-display text-lg font-semibold">{i > 1 ? "•••" : `${p.name}, ${p.age}`}</p>
              <p className="text-[11px] opacity-90">{p.industry}</p>
            </div>
            <span className="absolute right-2 top-2 grid h-8 w-8 place-items-center rounded-full bg-card text-berry"><Heart className="h-4 w-4" fill="currentColor" /></span>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
