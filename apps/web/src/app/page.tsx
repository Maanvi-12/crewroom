import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const steps = [
  {
    title: "Pick your role and stack",
    text: "Developer, tester, scrum master or project manager. Choose your stack and a project size.",
  },
  {
    title: "Join a team today",
    text: "Take an open seat on a team in your country, or start a new one. No waiting list.",
  },
  {
    title: "Ship it and get verified",
    text: "Work in sprints with standups and reviews. Every contribution feeds your verified report.",
  },
];

const roles = [
  { name: "Developer", text: "Build features, open pull requests and review teammates' code." },
  { name: "Tester", text: "Write test cases, find bugs and sign off on releases." },
  { name: "Scrum master", text: "Run ceremonies, clear blockers and keep the team healthy." },
  { name: "Project manager", text: "Own the backlog, set priorities and talk to the client." },
];

const sizes = [
  { name: "Small", meta: "4–6 weeks · 4–5 people", text: "One core feature set. The best place to start." },
  { name: "Medium", meta: "8–10 weeks · 6–7 people", text: "Multiple user roles, integrations and a real deployment." },
  { name: "Large", meta: "12–16 weeks · 8–10 people", text: "Several modules, CI/CD and changing requirements." },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b">
        <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <Link href="/" className="text-xl font-bold">
            Crewroom
          </Link>
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <a href="#how" className="text-muted-foreground hover:text-foreground">
              How it works
            </a>
            <a href="#roles" className="text-muted-foreground hover:text-foreground">
              Roles
            </a>
            <Link href="/onboarding" className={buttonVariants()}>
              Get started
            </Link>
          </div>
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            A real job, before your first job
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Get real team experience before you get hired.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            Pick a role and a stack. Join a remote team the same day. Ship a real project in
            2&#8209;week sprints, coached by an AI senior, and leave with a verified experience report.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/onboarding" className={buttonVariants({ size: "lg" })}>
              Choose your role
            </Link>
            <a href="#how" className={buttonVariants({ size: "lg", variant: "outline" })}>
              See how it works
            </a>
          </div>
        </section>

        <section id="how" className="border-y bg-muted/40">
          <div className="mx-auto max-w-6xl px-6 py-16">
            <h2 className="text-3xl font-semibold">How it works</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title}>
                  <p className="text-sm font-semibold text-muted-foreground">0{i + 1}</p>
                  <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-muted-foreground">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="roles" className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-3xl font-semibold">Roles you can take</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roles.map((role) => (
              <div key={role.name} className="rounded-xl border p-6">
                <h3 className="font-semibold">{role.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{role.text}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-3xl font-semibold">Project sizes</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {sizes.map((size) => (
              <div key={size.name} className="rounded-xl border p-6">
                <h3 className="font-semibold">{size.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{size.meta}</p>
                <p className="mt-3 text-sm">{size.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-primary p-10 text-primary-foreground">
            <div>
              <h2 className="text-2xl font-semibold">Your first team is waiting.</h2>
              <p className="mt-2 opacity-80">Start today. AI fills the seats until your teammates arrive.</p>
            </div>
            <Link href="/onboarding" className={buttonVariants({ size: "lg", variant: "secondary" })}>
              Choose your role
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-muted-foreground">
          © 2026 Crewroom
        </div>
      </footer>
    </div>
  );
}