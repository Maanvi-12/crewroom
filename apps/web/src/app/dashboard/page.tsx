"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock, Gauge, ListTodo, Sparkles } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ComingSoonCard } from "@/components/dashboard/coming-soon-card";
import { TeamCard } from "@/components/dashboard/team-card";
import { buttonVariants } from "@/components/ui/button";
import { fetchMyTeam, type Team } from "@/lib/api";
import { cn } from "@/lib/utils";

type PageState =
  | { status: "loading" }
  | { status: "ready"; team: Team }
  | { status: "no-team" }
  | { status: "error" };

export default function DashboardPage() {
  const [state, setState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    fetchMyTeam()
      .then((team) => setState(team ? { status: "ready", team } : { status: "no-team" }))
      .catch(() => setState({ status: "error" }));
  }, []);

  return (
    <AppShell active="Dashboard">
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
        <header>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">Your team, your sprint and what&apos;s next.</p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ComingSoonCard
              icon={Gauge}
              title="Current sprint"
              description="Sprint progress, days left and story points will show here once sprints are live."
            />
            <ComingSoonCard
              icon={ListTodo}
              title="My tickets"
              description="Tickets assigned to you from the task board."
            />
            <div className="grid gap-6 md:grid-cols-2">
              <ComingSoonCard
                icon={CalendarClock}
                title="Upcoming meetings"
                description="Standups, sprint reviews and retros."
              />
              <ComingSoonCard
                icon={Sparkles}
                title="AI feedback"
                description="Notes from your AI senior after each sprint review."
              />
            </div>
          </div>

          <div>
            {state.status === "loading" && (
              <div className="h-64 animate-pulse rounded-xl border bg-muted/40" aria-label="Loading your team" />
            )}

            {state.status === "error" && (
              <section className="rounded-xl border p-6">
                <h2 className="font-semibold">Couldn&apos;t load your team</h2>
                <p className="mt-2 text-sm text-muted-foreground">Check that the API is running, then refresh.</p>
              </section>
            )}

            {state.status === "no-team" && (
              <section className="rounded-xl border p-6">
                <h2 className="font-semibold">No team yet</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Finish onboarding and we&apos;ll place you on a team.
                </p>
                <Link href="/onboarding" className={cn(buttonVariants(), "mt-4")}>
                  Go to onboarding
                </Link>
              </section>
            )}

            {state.status === "ready" && <TeamCard team={state.team} />}
          </div>
        </div>
      </main>
    </AppShell>
  );
}