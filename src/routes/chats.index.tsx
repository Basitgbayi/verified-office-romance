import { createFileRoute, Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { AppShell } from "@/components/AppShell";
import { conversations, getProfile, profiles } from "@/lib/data";

export const Route = createFileRoute("/chats/")({
  head: () => ({
    meta: [
      { title: "Chats — Lunchbreak" },
      { name: "description", content: "Your matches and conversations." },
      { property: "og:title", content: "Chats — Lunchbreak" },
      { property: "og:description", content: "Message your Lunchbreak matches." },
    ],
  }),
  component: Chats,
});

function Chats() {
  return (
    <AppShell>
      <header className="px-5 pt-6">
        <h1 className="text-2xl font-semibold">Messages</h1>
        <div className="mt-3 flex h-11 items-center gap-2 rounded-full bg-card px-4 shadow-soft">
          <Search className="h-4 w-4 text-sky" />
          <input className="flex-1 bg-transparent text-sm outline-none" placeholder="Search matches" />
        </div>
      </header>

      <p className="mt-5 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">New matches</p>
      <div className="mt-2 flex gap-4 overflow-x-auto px-5">
        {profiles.map((p) => (
          <Link key={p.id} to="/chats/$id" params={{ id: p.id }} className="flex shrink-0 flex-col items-center gap-1">
            <span className="rounded-full bg-brand p-0.5">
              <img src={p.photo} alt={p.name} className="h-16 w-16 rounded-full border-2 border-card object-cover" />
            </span>
            <span className="text-xs font-semibold">{p.name}</span>
          </Link>
        ))}
      </div>

      <p className="mt-6 px-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Conversations</p>
      <ul className="mt-2 px-3">
        {conversations.map((c) => {
          const p = getProfile(c.id)!;
          const last = c.messages[c.messages.length - 1]!;
          return (
            <li key={c.id}>
              <Link to="/chats/$id" params={{ id: c.id }} className="flex items-center gap-3 rounded-2xl p-2 active:bg-muted">
                <img src={p.photo} alt={p.name} className="h-14 w-14 rounded-full object-cover" />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between">
                    <p className="font-semibold">{p.name}</p>
                    <span className="text-[11px] text-muted-foreground">{last.time}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-sm text-muted-foreground">{last.text}</p>
                    {c.unread > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{c.unread}</span>}
                  </div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
