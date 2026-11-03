import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { Section, SubPage } from "@/components/SubPage";

export const Route = createFileRoute("/profile_/settings/language")({
  head: () => ({
    meta: [
      { title: "Language — Afterfive" },
      { name: "description", content: "Choose the language for your Afterfive app." },
      { property: "og:title", content: "Language — Afterfive" },
      { property: "og:description", content: "Choose your Afterfive language." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LanguagePage,
});

const languages = [
  { label: "English", native: "English" },
  { label: "French", native: "Français" },
  { label: "Spanish", native: "Español" },
  { label: "Portuguese", native: "Português" },
  { label: "Arabic", native: "العربية" },
  { label: "Hausa", native: "Hausa" },
  { label: "Yoruba", native: "Yorùbá" },
  { label: "Igbo", native: "Igbo" },
];

function LanguagePage() {
  const [picked, setPicked] = useState("English");
  return (
    <SubPage
      title="Language"
      subtitle="App display language"
      backTo="/profile/settings"
      onSave={() => setPicked(picked)}
    >
      <Section title="Choose language">
        <ul className="divide-y divide-border">
          {languages.map((l) => {
            const on = picked === l.label;
            return (
              <li key={l.label}>
                <button onClick={() => setPicked(l.label)} className="flex w-full items-center gap-3 py-3 text-left">
                  <span className="flex-1">
                    <span className={`block text-sm font-semibold ${on ? "text-foreground" : ""}`}>{l.native}</span>
                    <span className="block text-xs text-muted-foreground">{l.label}</span>
                  </span>
                  {on && (
                    <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </Section>
      <p className="px-1 text-xs text-muted-foreground">Your matches keep using whichever language they picked — chats translate both ways.</p>
    </SubPage>
  );
}
