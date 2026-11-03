import { createFileRoute } from "@tanstack/react-router";
import { Ban, EyeOff, MapPin, PhoneCall, ShieldCheck, UserRoundX, Video, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { IconChip } from "@/components/AppShell";
import { Section, SubPage } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings/safety")({
  head: () => ({
    meta: [
      { title: "Safety centre — Afterfive" },
      { name: "description", content: "Safety tips, blocking and reporting on Afterfive." },
      { property: "og:title", content: "Safety centre — Afterfive" },
      { property: "og:description", content: "Stay safe on Afterfive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: SafetyPage,
});

const tips = [
  { icon: MapPin, tone: "coral" as const, title: "Meet in public first", body: "Pick a busy café, restaurant or bar for your first meetup — never a home or office." },
  { icon: PhoneCall, tone: "sky" as const, title: "Video chat before you go", body: "A quick call confirms you're talking to the person in the photos." },
  { icon: EyeOff, tone: "sun" as const, title: "Tell someone your plan", body: "Share where you're going and when you expect to be back with a friend." },
  { icon: ShieldCheck, tone: "mint" as const, title: "Keep work and dating apart", body: "Don't share your work address, staff ID or confidential files with matches." },
];

function ActionRow({ icon, tone, label, hint, onClick }: { icon: React.ComponentType<{ className?: string }>; tone: "coral" | "sky" | "mint" | "sun" | "berry"; label: string; hint?: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex w-full items-center gap-3 py-2.5 text-left">
      <IconChip icon={icon} tone={tone} />
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}

function SafetyPage() {
  return (
    <SubPage title="Safety centre" subtitle="Date smart, stay in control" backTo="/profile/settings">
      <Section title="Golden rules">
        {tips.map((t) => (
          <div key={t.title} className="flex gap-3 py-3">
            <IconChip icon={t.icon} tone={t.tone} />
            <div className="flex-1">
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="pt-0.5 text-xs text-muted-foreground">{t.body}</p>
            </div>
          </div>
        ))}
      </Section>

      <Section title="Take action">
        <ActionRow icon={Ban} tone="berry" label="Blocked accounts" hint="2 people blocked" onClick={() => toast("Blocked accounts — you unblocked nobody today")} />
        <ActionRow icon={UserRoundX} tone="coral" label="Report someone" hint="Flag a profile or a chat" onClick={() => toast("Report sent to our trust & safety team")} />
        <ActionRow icon={Video} tone="sky" label="Date check-in" hint="Alert a friend during a first date" onClick={() => toast("Date check-in — coming soon")} />
      </Section>

      <p className="px-1 text-xs text-muted-foreground">Everyone on Afterfive is workplace-verified, but you still hold the final call. Trust your gut — leave any date that feels off.</p>
    </SubPage>
  );
}
