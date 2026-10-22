import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, CircleHelp, FileText, Globe, KeyRound, Pause, Phone, Shield, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IconChip } from "@/components/AppShell";
import { Section, SubPage, ToggleRow } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Afterfive" },
      { name: "description", content: "Account, security and app settings for Afterfive." },
      { property: "og:title", content: "Settings — Afterfive" },
      { property: "og:description", content: "Manage your Afterfive account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SettingsPage,
});

function Row({ icon, tone, label, value }: { icon: React.ComponentType<{ className?: string }>; tone: "coral" | "sky" | "mint" | "sun" | "berry"; label: string; value?: string }) {
  return (
    <button onClick={() => toast(`${label} — coming soon`)} className="flex w-full items-center gap-3 py-2.5 text-left">
      <IconChip icon={icon} tone={tone} />
      <span className="flex-1 text-sm font-semibold">{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function SettingsPage() {
  const [paused, setPaused] = useState(false);
  const [twoFa, setTwoFa] = useState(true);
  const [confirm, setConfirm] = useState(false);
  return (
    <SubPage title="Settings">
      <Section title="Account">
        <Row icon={Phone} tone="mint" label="Phone number" value="+234 •••• 4821" />
        <Row icon={Globe} tone="sky" label="Language" value="English" />
        <ToggleRow icon={Pause} tone="sun" label="Pause my profile" hint="Hide from Discover, keep your matches" checked={paused} onChange={setPaused} />
      </Section>
      <Section title="Security">
        <ToggleRow icon={KeyRound} tone="berry" label="Two-step login" checked={twoFa} onChange={setTwoFa} />
        <Row icon={Shield} tone="mint" label="Safety centre" />
      </Section>
      <Section title="Support">
        <Row icon={CircleHelp} tone="sun" label="Help & FAQs" />
        <Row icon={FileText} tone="sky" label="Terms & privacy policy" />
      </Section>
      <Section>
        {!confirm ? (
          <button onClick={() => setConfirm(true)} className="flex w-full items-center justify-center gap-2 py-2 text-sm font-semibold text-destructive">
            <Trash2 className="h-4 w-4" /> Delete account
          </button>
        ) : (
          <div className="text-center">
            <p className="text-sm font-semibold">Delete your account for good?</p>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setConfirm(false)} className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold">Cancel</button>
              <Link to="/" className="flex-1 rounded-full bg-destructive py-2.5 text-sm font-semibold text-destructive-foreground">Delete</Link>
            </div>
          </div>
        )}
      </Section>
      <p className="text-center text-xs text-muted-foreground">Afterfive v1.0</p>
    </SubPage>
  );
}
