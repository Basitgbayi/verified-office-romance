import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Phone, IconChip } from "@/components/AppShell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — Afterfive" },
      { name: "description", content: "Log in to Afterfive with your email and password." },
      { property: "og:title", content: "Log in — Afterfive" },
      { property: "og:description", content: "Welcome back to Afterfive." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Login,
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must be at least 6 characters.");
    setError("");
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back!");
      nav({ to: "/discover" });
    }, 700);
  };

  return (
    <Phone>
      <form onSubmit={submit} className="flex flex-1 flex-col px-6 pt-6">
        <Link to="/" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="mt-8 text-3xl font-semibold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Log in to see today's picks.</p>

        <div className="mt-6 space-y-3">
          <label className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
            <IconChip icon={Mail} tone="coral" />
            <div className="flex-1">
              <span className="text-xs font-semibold text-muted-foreground">Email</span>
              <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-sm outline-none" placeholder="you@company.com" />
            </div>
          </label>
          <label className="flex items-center gap-3 rounded-2xl bg-card p-3 shadow-soft">
            <IconChip icon={Lock} tone="sky" />
            <div className="flex-1">
              <span className="text-xs font-semibold text-muted-foreground">Password</span>
              <input type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-sm outline-none" placeholder="Your password" />
            </div>
            <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="text-muted-foreground">
              {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </label>
          {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
          <button type="button" onClick={() => toast("Reset link sent to your email (demo)")} className="text-sm font-semibold text-primary">
            Forgot password?
          </button>
        </div>

        <div className="mt-auto space-y-3 pb-8 pt-8">
          <button type="submit" disabled={loading}
            className="h-14 w-full rounded-full bg-brand font-semibold text-primary-foreground shadow-card disabled:opacity-60">
            {loading ? "Logging in…" : "Log in"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            New here? <Link to="/verify" className="font-semibold text-primary">Create an account</Link>
          </p>
        </div>
      </form>
    </Phone>
  );
}
