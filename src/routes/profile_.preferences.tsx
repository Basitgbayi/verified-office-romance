import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Chips, Section, Segmented, SubPage, fieldClass } from "@/components/SubPage";
import { Slider } from "@/components/ui/slider";

export const Route = createFileRoute("/profile_/preferences")({
  head: () => ({
    meta: [
      { title: "Dating preferences — Afterfive" },
      { name: "description", content: "Choose who you'd like to meet on Afterfive." },
      { property: "og:title", content: "Dating preferences — Afterfive" },
      { property: "og:description", content: "Set your Afterfive dating preferences." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Prefs,
});

const states = ["Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara"];

function Prefs() {
  const [state, setState] = useState("Lagos");
  const [gender, setGender] = useState("Women");
  const [age, setAge] = useState([25, 35]);
  const [dist, setDist] = useState([15]);
  const [intent, setIntent] = useState("Long-term");
  const [industries, setIndustries] = useState(["Fintech", "Consulting"]);
  const [when, setWhen] = useState(["Weekday evenings", "Weekends"]);
  const [seniority, setSeniority] = useState(["Mid-level", "Senior"]);

  return (
    <SubPage title="Dating preferences" subtitle="We use these to pick your daily matches" onSave={() => {}}>
      <Section title="Show me"><Segmented options={["Women", "Men", "Everyone"]} value={gender} onChange={setGender} /></Section>
      <Section title={`Age range · ${age[0]}–${age[1]}`}><Slider min={21} max={60} step={1} value={age} onValueChange={setAge} /></Section>
      <Section title="State">
        <select value={state} onChange={(e) => setState(e.target.value)} className={fieldClass} aria-label="State">
          <option value="Any">Any state</option>
          {states.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Section>
      <Section title={`Maximum distance · ${dist[0]} km`}><Slider min={1} max={50} step={1} value={dist} onValueChange={setDist} /></Section>
      <Section title="Looking for"><Segmented options={["Long-term", "Casual", "Not sure"]} value={intent} onChange={setIntent} /></Section>
      <Section title="Industries">
        <Chips options={["Fintech", "Consulting", "Banking", "Tech", "Law", "Oil & Gas", "Media", "Healthcare", "FMCG"]} value={industries} onChange={setIndustries} />
      </Section>
      <Section title="Career level">
        <Chips options={["Entry", "Mid-level", "Senior", "Manager", "Director", "C-suite"]} value={seniority} onChange={setSeniority} />
      </Section>
      <Section title="When I'm free to date">
        <Chips options={["Lunch breaks", "Weekday evenings", "Weekends", "Virtual first"]} value={when} onChange={setWhen} />
      </Section>
    </SubPage>
  );
}
