import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Briefcase, Building2, EyeOff, Lock, Mail, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IconChip } from "@/components/AppShell";
import { Section, SubPage, ToggleRow } from "@/components/SubPage";
import { me } from "@/lib/data";

export const Route = createFileRoute("/profile_/workplace")({
  head: () => ({
    meta: [
      { title: "Workplace & privacy — Afterfive" },
      { name: "description", content: "Manage your verified workplace and what others can see on Afterfive." },
      { property: "og:title", content: "Workplace & privacy — Afterfive" },
      { property: "og:description", content: "Your verified workplace on Afterfive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Workplace,
});

function Workplace() {
  const [showCompany, setShowCompany] = useState(true);
  const [showTitle, setShowTitle] = useState(true);
  const [incognito, setIncognito] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);

  return (
    <SubPage title="Workplace & privacy" subtitle="Control how your job appears" onSave={() => {}}>
      <Section>
        <div className="flex items-center gap-3">
          <IconChip icon={Building2} tone="mint" />
          <div className="flex-1">
            <p className="flex items-center gap-1 text-sm font-semibold">{me.company} <BadgeCheck className="h-4 w-4 text-sky" /></p>
            <p className="text-xs text-muted-foreground">{me.role} · Verified 12 Sep 2026</p>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-mint-soft p-3 text-xs">
          <Mail className="h-4 w-4 text-mint" /> Verified with c•••@andela.com
        </div>
        <button onClick={() => toast("We'll send a new code to your work email")} className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border py-2.5 text-xs font-semibold">
          <RefreshCw className="h-3.5 w-3.5" /> Changed jobs? Re-verify
        </button>
      </Section>
      <Section title="On your profile">
        <ToggleRow icon={Building2} tone="mint" label="Show company name" hint="Off shows only your industry" checked={showCompany} onChange={setShowCompany} />
        <ToggleRow icon={Briefcase} tone="sun" label="Show job title" checked={showTitle} onChange={setShowTitle} />
      </Section>
      <Section title="Privacy">
        <ToggleRow icon={EyeOff} tone="berry" label="Incognito mode" hint="Only people you like can see you" checked={incognito} onChange={setIncognito} />
        <ToggleRow icon={Lock} tone="sky" label="Read receipts" checked={readReceipts} onChange={setReadReceipts} />
      </Section>
      <p className="px-2 text-xs text-muted-foreground">Your work email is never shown to anyone. We only use it to confirm where you work.</p>
    </SubPage>
  );
}
