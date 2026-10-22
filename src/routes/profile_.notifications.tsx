import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, Heart, Mail, MessageCircle, Moon, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { Section, SubPage, ToggleRow } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Afterfive" },
      { name: "description", content: "Choose which Afterfive alerts you get and when." },
      { property: "og:title", content: "Notifications — Afterfive" },
      { property: "og:description", content: "Afterfive notification settings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Notifs,
});

function Notifs() {
  const [s, setS] = useState({ matches: true, messages: true, likes: true, stars: true, picks: true, dates: true, email: false, quiet: true });
  const t = (k: keyof typeof s) => (v: boolean) => setS({ ...s, [k]: v });
  return (
    <SubPage title="Notifications" subtitle="Stay in the loop, on your schedule" onSave={() => {}}>
      <Section title="Push">
        <ToggleRow icon={Heart} tone="coral" label="New matches" checked={s.matches} onChange={t("matches")} />
        <ToggleRow icon={MessageCircle} tone="sky" label="Messages" checked={s.messages} onChange={t("messages")} />
        <ToggleRow icon={Sparkles} tone="berry" label="Someone liked you" checked={s.likes} onChange={t("likes")} />
        <ToggleRow icon={Star} tone="sun" label="Super likes" checked={s.stars} onChange={t("stars")} />
        <ToggleRow icon={CalendarHeart} tone="mint" label="Date reminders" checked={s.dates} onChange={t("dates")} />
        <ToggleRow icon={Sparkles} tone="coral" label="Daily picks at 5pm" checked={s.picks} onChange={t("picks")} />
      </Section>
      <Section title="Other">
        <ToggleRow icon={Mail} tone="sky" label="Email updates" checked={s.email} onChange={t("email")} />
        <ToggleRow icon={Moon} tone="berry" label="Quiet during work hours" hint="Mute alerts 9am–5pm, Mon–Fri" checked={s.quiet} onChange={t("quiet")} />
      </Section>
    </SubPage>
  );
}
