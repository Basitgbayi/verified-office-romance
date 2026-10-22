import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";
import { toast } from "sonner";
import { AppShell, IconChip } from "@/components/AppShell";
import { Switch } from "@/components/ui/switch";

export function SubPage({ title, subtitle, children, onSave }: { title: string; subtitle?: string; children: ReactNode; onSave?: () => void }) {
  return (
    <AppShell>
      <div className="flex items-center gap-3 px-5 pt-6">
        <Link to="/profile" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft">
          <ChevronLeft className="h-5 w-5" />
        </Link>
        <div className="flex-1">
          <h1 className="font-display text-xl font-semibold">{title}</h1>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="space-y-4 px-5 pb-6 pt-5">{children}</div>
      {onSave && (
        <div className="px-5 pb-8">
          <button
            onClick={() => { onSave(); toast.success("Saved"); }}
            className="w-full rounded-full bg-brand py-3.5 text-sm font-bold text-primary-foreground shadow-card active:scale-[0.98]"
          >
            Save changes
          </button>
        </div>
      )}
    </AppShell>
  );
}

export function Section({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl bg-card p-4 shadow-soft">
      {title && <h2 className="mb-3 text-xs font-bold uppercase tracking-wide text-muted-foreground">{title}</h2>}
      {children}
    </section>
  );
}

type Tone = "coral" | "sky" | "mint" | "sun" | "berry";

export function ToggleRow({ icon, tone, label, hint, checked, onChange }: {
  icon: React.ComponentType<{ className?: string }>; tone: Tone; label: string; hint?: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-3 py-2.5">
      <IconChip icon={icon} tone={tone} />
      <span className="flex-1">
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
      </span>
      <Switch checked={checked} onCheckedChange={onChange} />
    </label>
  );
}

export function Chips({ options, value, onChange }: { options: string[]; value: string[]; onChange: (v: string[]) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(on ? value.filter((x) => x !== o) : [...value, o])}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${on ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

export function Segmented({ options, value, onChange }: { options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex rounded-full bg-muted p-1">
      {options.map((o) => (
        <button key={o} type="button" onClick={() => onChange(o)}
          className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${value === o ? "bg-card shadow-soft" : "text-muted-foreground"}`}>
          {o}
        </button>
      ))}
    </div>
  );
}

export const fieldClass = "w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary";
