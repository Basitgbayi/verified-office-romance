import { createFileRoute } from "@tanstack/react-router";
import { ChevronDown, Mail, MessageCircleWarning } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { IconChip } from "@/components/AppShell";
import { Section, SubPage } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings/help")({
  head: () => ({
    meta: [
      { title: "Help & FAQs — Afterfive" },
      { name: "description", content: "Answers about matching, verification and your Afterfive account." },
      { property: "og:title", content: "Help & FAQs — Afterfive" },
      { property: "og:description", content: "Afterfive help and FAQs." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HelpPage,
});

const faqs = [
  { q: "How does workplace verification work?", a: "We confirm you're employed by checking your work email or LinkedIn. Your employer's name shows on your profile — your email never does." },
  { q: "Can my colleagues see me on Afterfive?", a: "No. Go to Profile → Hide from colleagues to block everyone who signed up with the same company's work email domain." },
  { q: "Why am I not seeing many profiles?", a: "Your Dating preferences — age range, distance, state and industries — narrow the pool. Loosening any of them widens your picks." },
  { q: "What counts as a match?", a: "When you both like each other, the chat unlocks. Sending a Super like doesn't need a match — it goes straight to their chat." },
  { q: "Can I pause my account?", a: "Yes. Settings → Pause my profile hides you from Discover while keeping your matches and chats intact." },
  { q: "How do I delete my account?", a: "Settings → Delete account removes your profile, chats and matches permanently. Verification data is kept only as long as the law requires." },
];

function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SubPage title="Help & FAQs" subtitle="Quick answers, no waiting room" backTo="/profile/settings">
      <Section title="Top questions">
        <ul className="divide-y divide-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q}>
                <button onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center gap-3 py-3 text-left">
                  <span className="flex-1 text-sm font-semibold">{f.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="pb-3 text-xs leading-relaxed text-muted-foreground">{f.a}</p>}
              </li>
            );
          })}
        </ul>
      </Section>

      <Section title="Still stuck?">
        <button onClick={() => toast("We aim to reply within one working day")} className="flex w-full items-center gap-3 py-2.5 text-left">
          <IconChip icon={Mail} tone="sky" />
          <span className="flex-1">
            <span className="block text-sm font-semibold">Email support</span>
            <span className="block text-xs text-muted-foreground">help@afterfive.app · replies in 1 working day</span>
          </span>
        </button>
        <button onClick={() => toast("Report sent to our trust & safety team")} className="flex w-full items-center gap-3 py-2.5 text-left">
          <IconChip icon={MessageCircleWarning} tone="coral" />
          <span className="flex-1">
            <span className="block text-sm font-semibold">Report a problem</span>
            <span className="block text-xs text-muted-foreground">Something broken, or someone unsafe</span>
          </span>
        </button>
      </Section>
    </SubPage>
  );
}
