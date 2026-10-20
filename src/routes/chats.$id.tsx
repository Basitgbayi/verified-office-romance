import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Coffee, Phone as PhoneIcon, Send, Smile, Video } from "lucide-react";
import { useState } from "react";
import { Phone, VerifiedBadge } from "@/components/AppShell";
import { conversations, getProfile, type Message } from "@/lib/data";

export const Route = createFileRoute("/chats/$id")({
  loader: ({ params }) => {
    const p = getProfile(params.id);
    if (!p) throw notFound();
    return { id: p.id };
  },
  head: () => ({
    meta: [
      { title: "Chat — Lunchbreak" },
      { name: "description", content: "Chat with your match." },
      { property: "og:title", content: "Chat — Lunchbreak" },
      { property: "og:description", content: "Chat with your Lunchbreak match." },
    ],
  }),
  component: Chat,
});

function Chat() {
  const { id } = Route.useLoaderData();
  const p = getProfile(id)!;
  const [msgs, setMsgs] = useState<Message[]>(conversations.find((c) => c.id === id)?.messages ?? []);
  const [text, setText] = useState("");

  const send = (t: string) => {
    if (!t.trim()) return;
    setMsgs((m) => [...m, { from: "me", text: t, time: "now" }]);
    setText("");
    setTimeout(() => setMsgs((m) => [...m, { from: "them", text: "Sounds great! 😊", time: "now" }]), 1200);
  };

  return (
    <Phone>
      <header className="flex items-center gap-3 border-b bg-card px-4 py-3">
        <Link to="/chats" className="grid h-9 w-9 place-items-center rounded-full bg-muted"><ArrowLeft className="h-5 w-5" /></Link>
        <img src={p.photo} alt={p.name} className="h-10 w-10 rounded-full object-cover" />
        <div className="flex-1">
          <p className="flex items-center gap-1.5 font-semibold">{p.name} <VerifiedBadge /></p>
          <p className="text-[11px] text-muted-foreground">{p.role} · {p.company}</p>
        </div>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-mint-soft text-mint"><PhoneIcon className="h-4 w-4" /></button>
        <button className="grid h-9 w-9 place-items-center rounded-full bg-sky-soft text-sky"><Video className="h-4 w-4" /></button>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto px-4 py-4">
        <div className="mx-auto mb-4 max-w-xs rounded-2xl bg-sun-soft p-3 text-center text-xs">
          🕐 {p.name} is usually free: <b>{p.schedule}</b>
        </div>
        {msgs.length === 0 && <p className="pt-10 text-center text-sm text-muted-foreground">You matched with {p.name}. Break the ice!</p>}
        {msgs.map((m, i) => (
          <div key={i} className={`flex ${m.from === "me" ? "justify-end" : ""}`}>
            <p className={`max-w-[75%] rounded-3xl px-4 py-2.5 text-sm ${m.from === "me" ? "rounded-br-md bg-brand text-primary-foreground" : "rounded-bl-md bg-card shadow-soft"}`}>{m.text}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 pb-2">
        <Quick icon={Coffee} cls="bg-sun-soft text-sun" label="Coffee break?" onClick={send} />
        <Quick icon={CalendarPlus} cls="bg-berry-soft text-berry" label="Plan a date after work" onClick={send} />
      </div>

      <form onSubmit={(e) => { e.preventDefault(); send(text); }} className="flex items-center gap-2 border-t bg-card px-3 py-3 pb-6">
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full bg-sun-soft text-sun"><Smile className="h-5 w-5" /></button>
        <input value={text} onChange={(e) => setText(e.target.value)} className="h-11 flex-1 rounded-full bg-muted px-4 text-sm outline-none" placeholder="Type a message..." />
        <button className="grid h-11 w-11 place-items-center rounded-full bg-brand text-primary-foreground"><Send className="h-5 w-5" /></button>
      </form>
    </Phone>
  );
}

function Quick({ icon: Icon, cls, label, onClick }: { icon: any; cls: string; label: string; onClick: (t: string) => void }) {
  return (
    <button onClick={() => onClick(label)} className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${cls}`}>
      <Icon className="h-3.5 w-3.5" /> {label}
    </button>
  );
}
