import { createFileRoute } from "@tanstack/react-router";
import { Camera, Plus } from "lucide-react";
import { useState } from "react";
import { Chips, Section, SubPage, fieldClass } from "@/components/SubPage";
import { me, profiles } from "@/lib/data";

export const Route = createFileRoute("/profile_/edit")({
  head: () => ({
    meta: [
      { title: "Edit profile — Afterfive" },
      { name: "description", content: "Update your photos, bio, prompts and interests on Afterfive." },
      { property: "og:title", content: "Edit profile — Afterfive" },
      { property: "og:description", content: "Update your Afterfive profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: EditProfile,
});

const allInterests = ["Brunch", "Pilates", "Afrobeats", "Travel", "Tech", "Books", "Football", "Cooking", "Art", "Running", "Wine", "Gaming"];

function EditProfile() {
  const [photos, setPhotos] = useState<(string | null)[]>([me.photo, profiles[0]?.photo ?? null, null, null, null, null]);
  const [bio, setBio] = useState("Engineer who codes by day and plays the drums by night. Looking for someone to share Friday suya runs with.");
  const [role, setRole] = useState(me.role);
  const [company, setCompany] = useState(me.company);
  const [prompt, setPrompt] = useState("Debugging over coffee, then a long walk on the beach.");
  const [interests, setInterests] = useState(["Tech", "Afrobeats", "Football"]);

  return (
    <SubPage title="Edit profile" subtitle="Profiles with 4+ photos get 3x more matches" onSave={() => {}}>
      <Section title="Photos">
        <div className="grid grid-cols-3 gap-2">
          {photos.map((p, i) => (
            <button key={i} type="button"
              onClick={() => setPhotos((ps) => ps.map((x, j) => (j === i ? (x ? null : me.photo) : x)))}
              className="relative aspect-[3/4] overflow-hidden rounded-2xl border-2 border-dashed border-border bg-muted">
              {p ? <img src={p} alt="" className="h-full w-full object-cover" /> : <Plus className="m-auto h-6 w-6 text-primary" />}
              {i === 0 && p && <span className="absolute left-1 top-1 rounded-full bg-primary px-2 text-[10px] font-bold text-primary-foreground">Main</span>}
            </button>
          ))}
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><Camera className="h-3.5 w-3.5" /> Tap a photo to remove, tap an empty slot to add</p>
      </Section>
      <Section title="About you">
        <textarea value={bio} onChange={(e) => setBio(e.target.value.slice(0, 300))} rows={4} className={fieldClass} />
        <p className="mt-1 text-right text-xs text-muted-foreground">{bio.length}/300</p>
      </Section>
      <Section title="Work">
        <div className="space-y-2">
          <input value={role} onChange={(e) => setRole(e.target.value)} className={fieldClass} placeholder="Job title" />
          <input value={company} onChange={(e) => setCompany(e.target.value)} className={fieldClass} placeholder="Company" />
        </div>
      </Section>
      <Section title="My ideal after-work date">
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} className={fieldClass} />
      </Section>
      <Section title={`Interests (${interests.length}/5)`}>
        <Chips options={allInterests} value={interests} onChange={(v) => v.length <= 5 && setInterests(v)} />
      </Section>
    </SubPage>
  );
}
