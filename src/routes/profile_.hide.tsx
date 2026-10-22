import { createFileRoute } from "@tanstack/react-router";
import { Building2, Plus, Users, X } from "lucide-react";
import { useState } from "react";
import { Section, SubPage, ToggleRow, fieldClass } from "@/components/SubPage";
import { me } from "@/lib/data";

export const Route = createFileRoute("/profile_/hide")({
  head: () => ({
    meta: [
      { title: "Hide from colleagues — Afterfive" },
      { name: "description", content: "Keep your Afterfive profile hidden from coworkers and chosen companies." },
      { property: "og:title", content: "Hide from colleagues — Afterfive" },
      { property: "og:description", content: "Stay private from coworkers on Afterfive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Hide,
});

function Hide() {
  const [own, setOwn] = useState(true);
  const [contacts, setContacts] = useState(false);
  const [blocked, setBlocked] = useState(["Paystack", "Interswitch"]);
  const [input, setInput] = useState("");

  const add = () => {
    const v = input.trim();
    if (v && !blocked.includes(v)) setBlocked([...blocked, v]);
    setInput("");
  };

  return (
    <SubPage title="Hide from colleagues" subtitle="Date without the office knowing" onSave={() => {}}>
      <Section>
        <ToggleRow icon={Building2} tone="berry" label={`Hide from ${me.company}`} hint="People at your company won't see you" checked={own} onChange={setOwn} />
        <ToggleRow icon={Users} tone="sky" label="Hide from phone contacts" checked={contacts} onChange={setContacts} />
      </Section>
      <Section title="Also hide me from">
        <div className="flex gap-2">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && add()} placeholder="Add a company" className={fieldClass} />
          <button onClick={add} aria-label="Add" className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground"><Plus className="h-5 w-5" /></button>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {blocked.map((c) => (
            <span key={c} className="flex items-center gap-1 rounded-full bg-berry-soft px-3 py-1.5 text-xs font-semibold">
              {c}
              <button onClick={() => setBlocked(blocked.filter((x) => x !== c))} aria-label={`Remove ${c}`}><X className="h-3.5 w-3.5" /></button>
            </span>
          ))}
          {blocked.length === 0 && <p className="text-xs text-muted-foreground">No companies added</p>}
        </div>
      </Section>
    </SubPage>
  );
}
