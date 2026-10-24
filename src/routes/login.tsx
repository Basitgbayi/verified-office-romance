import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Clock, Eye, EyeOff, ShieldCheck, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Phone } from "@/components/AppShell";

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

  const fields = (
    <div className="space-y-3">
      <label className="block rounded-2xl bg-card p-3 shadow-soft">
        <span className="text-xs font-semibold text-muted-foreground">Email</span>
        <input type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent text-sm outline-none" placeholder="you@company.com" />
      </label>
      <label className="block rounded-2xl bg-card p-3 shadow-soft">
        <span className="text-xs font-semibold text-muted-foreground">Password</span>
        <div className="flex items-center gap-2">
          <input type={show ? "text" : "password"} autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent text-sm outline-none" placeholder="Your password" />
          <button type="button" onClick={() => setShow(!show)} aria-label={show ? "Hide password" : "Show password"} className="text-muted-foreground">
            {show ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </label>
      {error && <p className="text-sm font-semibold text-destructive">{error}</p>}
      <Link to="/forgot-password" className="text-sm font-semibold text-primary">
        Forgot password?
      </Link>
    </div>
  );

  return (
    <>
      <div className="lg:hidden">
        <Phone>
          <form onSubmit={submit} className="flex flex-1 flex-col px-6 pt-6">
            <Link to="/" aria-label="Back" className="grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft"><ArrowLeft className="h-5 w-5" /></Link>
            <h1 className="mt-8 text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Log in to see today's picks.</p>

            <div className="mt-6">{fields}</div>

            <div className="mt-auto space-y-3 pb-8 pt-8">
              <SubmitButton loading={loading} />
              <p className="text-center text-sm text-muted-foreground">
                New here? <Link to="/verify" className="font-semibold text-primary">Create an account</Link>
              </p>
            </div>
          </form>
        </Phone>
      </div>

      <div className="hidden min-h-dvh lg:grid lg:grid-cols-2">
        <aside className="relative flex flex-col justify-between overflow-hidden bg-brand p-14 text-primary-foreground">
          <div aria-hidden className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-ink/20 blur-3xl" />
          <Link to="/" className="relative flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-card/15 backdrop-blur"><Clock className="h-5 w-5" /></span>
            <span className="font-display text-2xl font-semibold">Afterfive</span>
          </Link>
          <div className="relative max-w-md">
            <h1 className="font-display text-5xl font-semibold leading-tight tracking-tight">Welcome back, professional.</h1>
            <p className="mt-4 text-lg opacity-90">Your verified matches are waiting — five minutes is all it takes.</p>
            <div className="mt-8 space-y-3 text-sm opacity-90">
              <p className="flex items-center gap-2"><ShieldCheck className="h-5 w-5" /> Workplace-verified members only</p>
              <p className="flex items-center gap-2"><Sparkles className="h-5 w-5" /> Fresh curated picks every morning</p>
            </div>
          </div>
          <p className="relative text-sm opacity-80">💼 2,400+ verified professionals</p>
        </aside>

        <div className="flex items-center justify-center bg-background p-14">
          <form onSubmit={submit} className="w-full max-w-sm">
            <h1 className="text-3xl font-semibold">Welcome back</h1>
            <p className="mt-2 text-sm text-muted-foreground">Log in to see today's picks.</p>
            <div className="mt-6">{fields}</div>
            <div className="mt-8 space-y-3">
              <SubmitButton loading={loading} />
              <p className="text-center text-sm text-muted-foreground">
                New here? <Link to="/verify" className="font-semibold text-primary">Create an account</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

function SubmitButton({ loading }: { loading: boolean }) {
  return (
    <button type="submit" disabled={loading}
      className="h-14 w-full rounded-full bg-brand font-semibold text-primary-foreground shadow-card transition hover:opacity-95 disabled:opacity-60">
      {loading ? "Logging in…" : "Log in"}
    </button>
  );
}
