import { Link, useLocation } from "@tanstack/react-router";
import { Clock, Flame, Heart, MessageCircle, User } from "lucide-react";
import type { ReactNode } from "react";
import { me } from "@/lib/data";

const tabs = [
  { to: "/discover", label: "Discover", icon: Flame, color: "text-coral", bg: "bg-coral-soft" },
  { to: "/likes", label: "Likes", icon: Heart, color: "text-berry", bg: "bg-berry-soft" },
  { to: "/chats", label: "Chats", icon: MessageCircle, color: "text-sky", bg: "bg-sky-soft" },
  { to: "/profile", label: "Profile", icon: User, color: "text-mint", bg: "bg-mint-soft" },
] as const;

export function Phone({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden sm:py-10">
      <div aria-hidden className="pointer-events-none absolute -left-32 top-1/4 hidden h-80 w-80 rounded-full bg-coral-soft blur-3xl lg:block" />
      <div aria-hidden className="pointer-events-none absolute -right-32 bottom-1/4 hidden h-80 w-80 rounded-full bg-berry-soft blur-3xl lg:block" />
      <div aria-hidden className="pointer-events-none absolute right-1/4 top-8 hidden h-40 w-40 rounded-full bg-sun-soft blur-2xl lg:block" />
      <div className="relative flex h-dvh max-w-md flex-col bg-background sm:my-6 sm:h-[860px] sm:overflow-hidden sm:rounded-[2.5rem] sm:shadow-card">
        {children}
      </div>
    </div>
  );
}

function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="flex w-72 shrink-0 flex-col border-r bg-card p-6">
      <Link to="/discover" className="flex items-center gap-2 px-2 py-1">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-primary-foreground">
          <Clock className="h-5 w-5" />
        </span>
        <span className="font-display text-xl font-semibold">Afterfive</span>
      </Link>

      <nav className="mt-10 flex flex-col gap-1.5">
        {tabs.map((t) => {
          const active = pathname.startsWith(t.to);
          const Icon = t.icon;
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold transition ${active ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:bg-muted"}`}
            >
              <span className={`grid h-10 w-10 place-items-center rounded-xl ${active ? t.bg : "bg-muted"}`}>
                <Icon className={`h-5 w-5 ${active ? t.color : ""}`} fill={active ? "currentColor" : "none"} />
              </span>
              {t.label}
            </Link>
          );
        })}
      </nav>

      <Link to="/profile" className="mt-auto flex items-center gap-3 rounded-2xl bg-muted p-3 transition hover:bg-accent">
        <img src={me.photo} alt={me.name} className="h-10 w-10 rounded-full object-cover" />
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold">{me.name}</span>
          <span className="block truncate text-xs text-muted-foreground">{me.role} · {me.company}</span>
        </span>
      </Link>
    </aside>
  );
}

export function DesktopShell({ children, flush }: { children: ReactNode; flush?: boolean }) {
  return (
    <div className="hidden h-dvh w-full lg:flex">
      <Sidebar />
      <main className={flush ? "flex min-h-0 flex-1 flex-col overflow-hidden bg-background" : "flex-1 overflow-y-auto bg-background"}>
        <div className={flush ? "mx-auto flex h-full w-full max-w-2xl flex-col" : "mx-auto w-full max-w-xl px-8 py-10"}>
          {children}
        </div>
      </main>
    </div>
  );
}

export function AppShell({ children, flush }: { children: ReactNode; flush?: boolean }) {
  const { pathname } = useLocation();
  return (
    <>
      <div className="lg:hidden">
        <Phone>
          <main className={flush ? "flex min-h-0 flex-1 flex-col overflow-hidden" : "flex-1 overflow-y-auto pb-24"}>{children}</main>
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
      </div>
      <DesktopShell flush={flush}>{children}</DesktopShell>
    </>
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
