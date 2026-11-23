"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TeamMember = {
  id: number;
  display_name: string;
  role: string;
  is_ai: boolean;
};

type Team = {
  id: number;
  name: string;
  stack: string;
  project_size: string;
  country: string;
  status: string;
  members: TeamMember[];
};

type PageState =
  | { status: "loading" }
  | { status: "ready"; team: Team }
  | { status: "no-team" }
  | { status: "error" };

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

const ROLE_LABELS: Record<string, string> = {
  developer: "Developer",
  tester: "Tester",
  scrum_master: "Scrum master",
  project_manager: "Project manager",
};

export default function DashboardPage() {
  const [state, setState] = useState<PageState>({ status: "loading" });

  useEffect(() => {
    fetch(`${API_URL}/teams/me`)
      .then(async (response) => {
        if (response.status === 404) {
          setState({ status: "no-team" });
          return;
        }
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setState({ status: "ready", team: await response.json() });
      })
      .catch(() => setState({ status: "error" }));
  }, []);

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {state.status === "loading" && (
        <p className="mt-6 text-muted-foreground">Loading your team…</p>
      )}

      {state.status === "error" && (
        <p className="mt-6 text-destructive">
          Couldn&apos;t load your team. Is the API running?
        </p>
      )}

      {state.status === "no-team" && (
        <div className="mt-6 rounded-xl border p-6">
          <h2 className="font-semibold">No team yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Finish onboarding and we&apos;ll place you on a team.
          </p>
          <Link href="/onboarding" className={cn(buttonVariants(), "mt-4")}>
            Go to onboarding
          </Link>
        </div>
      )}

      {state.status === "ready" && <TeamCard team={state.team} />}
    </main>
  );
}

function TeamCard({ team }: { team: Team }) {
  return (
    <section className="mt-6 rounded-xl border p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-xl font-semibold">Team {team.name}</h2>
        <p className="text-sm capitalize text-muted-foreground">
          {team.project_size} project · {team.country}
        </p>
      </div>

      <ul className="mt-6 divide-y">
        {team.members.map((member) => (
          <li key={member.id} className="flex items-center justify-between py-3">
            <span className="font-medium">
              {member.display_name}
              {member.is_ai && (
                <span className="ml-2 rounded-full bg-muted px-2 py-0.5 text-xs font-semibold">
                  AI
                </span>
              )}
            </span>
            <span className="text-sm text-muted-foreground">
              {ROLE_LABELS[member.role] ?? member.role}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        AI holds empty seats until a teammate joins.
      </p>
    </section>
  );
}