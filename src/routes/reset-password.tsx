import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Phone } from "@/components/AppShell";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset password — Afterfive" },
      { name: "description", content: "Choose a new password for your Afterfive account." },
      { property: "og:title", content: "Reset password — Afterfive" },
      { property: "og:description", content: "Choose a new password for your Afterfive account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ResetPassword,
});

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    if (password !== confirm) return setError("Passwords don't match.");
    setError("");
    toast.success("Password updated — log in with your new password");
    nav({ to: "/login" });
  };

  return (
    <Phone>
      <form onSubmit={submit} className="flex flex-1 flex-col px-6 pt-6">
        <Link to="/login" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></Link>

        <div className="mt-8 flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-2xl bg-sky-soft shadow-soft">
            <KeyRound className="h-6 w-6 text-sky" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold">Set a new password</h1>
            <p className="text-xs text-muted-foreground">Pick something you haven't used before.</p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <label className="block rounded-2xl bg-card p-3 shadow-soft">
            <span className="text-xs font-semibold text-muted-foreground">New password</span>
            <div className="flex items-center gap-2">
              <input type={show ? "text" : "password"} autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none" placeholder="At least 6 characters" />
              <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="text-muted-foreground">
                {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </label>
          <label className="block rounded-2xl bg-card p-3 shadow-soft">
            <span className="text-xs font-semibold text-muted-foreground">Confirm new password</span>
            <input type={show ? "text" : "password"} autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="w-full bg-transparent text-sm outline-none" placeholder="Type it again" />
          </label>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
        </div>

        <div className="mt-auto space-y-3 pb-8 pt-8">
          <button type="submit"
            className="h-14 w-full rounded-full bg-brand font-semibold text-primary-foreground shadow-card active:scale-[0.98]">
            Update password
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Didn't get a link? <Link to="/forgot-password" className="font-semibold text-primary">Resend it</Link>
          </p>
        </div>
      </form>
    </Phone>
  );
}
