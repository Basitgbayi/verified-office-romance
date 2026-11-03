import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section, SubPage, Segmented } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings/legal")({
  head: () => ({
    meta: [
      { title: "Terms & privacy — Afterfive" },
      { name: "description", content: "Afterfive terms of service and privacy policy." },
      { property: "og:title", content: "Terms & privacy — Afterfive" },
      { property: "og:description", content: "Afterfive terms of service and privacy policy." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <p className="pt-1 text-xs leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}

function LegalPage() {
  const [tab, setTab] = useState("Terms of use");
  return (
    <SubPage title="Terms & privacy" subtitle="The fine print, in plain words" backTo="/profile/settings">
      <Segmented options={["Terms of use", "Privacy policy"]} value={tab} onChange={setTab} />

      {tab === "Terms of use" ? (
        <Section>
          <div className="space-y-4">
            <Block title="1. Who can join">
              Afterfive is for working professionals aged 18 and over. Every member verifies their workplace with a work email or LinkedIn before their profile goes live.
            </Block>
            <Block title="2. Your profile">
              Keep it honest and yours. Fake profiles, impersonation and photos of other people get accounts removed without a refund.
            </Block>
            <Block title="3. Respect at work and here">
              Harassment, unsolicited explicit content and sharing another member's details anywhere else lead to a permanent ban. Matches chat, they don't own each other.
            </Block>
            <Block title="4. No soliciting">
              Afterfive is for dating. Recruiting, selling, crypto pitches and MLM outreach are treated as spam and removed.
            </Block>
            <Block title="5. Ending your membership">
              Delete your account any time from Settings. Pausing hides you from Discover but keeps your matches.
            </Block>
          </div>
        </Section>
      ) : (
        <Section>
          <div className="space-y-4">
            <Block title="1. What we collect">
              Your name, date of birth, photos, preferences, and a proof of employment — a work email domain or LinkedIn URL. We never see or store the content of your work inbox.
            </Block>
            <Block title="2. What other members see">
              Only your profile: name, age, role, company, industry and what you choose to share. Your phone number, personal email and verification documents stay private.
            </Block>
            <Block title="3. Hiding from your employer">
              Blocking a company domain hides you from every account using that work email. Colleagues who signed up with a personal email can't be auto-hidden — report them and we'll act.
            </Block>
            <Block title="4. Your chats">
              Messages live only between you and your match. We don't read them, except to investigate a report you or your match sends us.
            </Block>
            <Block title="5. Deleting your data">
              Deleting your account removes your profile, photos, matches and messages. We keep the minimum verification record required by law, then it's gone too.
            </Block>
          </div>
        </Section>
      )}
      <p className="px-1 text-xs text-muted-foreground">Last updated: November 2026 · Afterfive Technologies Ltd.</p>
    </SubPage>
  );
}
