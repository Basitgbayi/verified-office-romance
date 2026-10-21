import { Link, useLocation } from "@tanstack/react-router";
import { Flame, Heart, MessageCircle, User } from "lucide-react";
import type { ReactNode } from "react";

const tabs = [
  { to: "/discover", label: "Discover", icon: Flame, color: "text-coral", bg: "bg-coral-soft" },
  { to: "/likes", label: "Likes", icon: Heart, color: "text-berry", bg: "bg-berry-soft" },
  { to: "/chats", label: "Chats", icon: MessageCircle, color: "text-sky", bg: "bg-sky-soft" },
  { to: "/profile", label: "Profile", icon: User, color: "text-mint", bg: "bg-mint-soft" },
] as const;

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-dvh max-w-md flex-col bg-background sm:my-6 sm:h-[860px] sm:overflow-hidden sm:rounded-[2.5rem] sm:shadow-card">
      {children}
    </div>
  );
}

export function AppShell({ children, flush }: { children: ReactNode; flush?: boolean }) {
  const { pathname } = useLocation();
  return (
    <Phone>
      <main className={flush ? "min-h-0 flex-1 overflow-hidden" : "flex-1 overflow-y-auto pb-24"}>{children}</main>
      <nav className="sticky bottom-0 border-t bg-card/95 px-4 pb-5 pt-2 backdrop-blur">
        <ul className="flex justify-between">
          {tabs.map((t) => {
            const active = pathname.startsWith(t.to);
            const Icon = t.icon;
            return (
              <li key={t.to}>
                <Link to={t.to} className="flex flex-col items-center gap-1 px-3 py-1">
                  <span className={`grid h-10 w-14 place-items-center rounded-full transition ${active ? t.bg : ""}`}>
                    <Icon className={`h-5 w-5 ${active ? t.color : "text-muted-foreground"}`} fill={active ? "currentColor" : "none"} />
                  </span>
                  <span className={`text-[11px] font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </Phone>
  );
}

export function IconChip({ icon: Icon, tone }: { icon: React.ComponentType<{ className?: string }>; tone: "coral" | "sky" | "mint" | "sun" | "berry" }) {
  const map = {
    coral: "bg-coral-soft text-coral",
    sky: "bg-sky-soft text-sky",
    mint: "bg-mint-soft text-mint",
    sun: "bg-sun-soft text-sun",
    berry: "bg-berry-soft text-berry",
  };
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-2xl ${map[tone]}`}>
      <Icon className="h-5 w-5" />
    </span>
  );
}

export function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-sky px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-on-photo">
      <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor"><path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" /></svg>
      Verified
    </span>
  );
}
