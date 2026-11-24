import { ROLE_LABELS, type Team } from "@/lib/api";
import { cn } from "@/lib/utils";

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function TeamCard({ team }: { team: Team }) {
  const people = team.members.filter((member) => !member.is_ai).length;

  return (
    <section className="rounded-xl border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Your team</p>
          <h2 className="mt-1 text-xl font-semibold">Team {team.name}</h2>
        </div>
        <span className="rounded-full border px-3 py-1 text-xs capitalize text-muted-foreground">
          {team.project_size} project · {team.country}
        </span>
      </div>

      <ul className="mt-6 space-y-3">
        {team.members.map((member) => (
          <li
            key={member.id}
            className={cn("flex items-center gap-3 rounded-lg border p-3", member.is_ai && "border-dashed bg-muted/40")}
          >
            <span
              aria-hidden
              className={cn(
                "flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                member.is_ai ? "bg-muted text-muted-foreground" : "bg-primary text-primary-foreground",
              )}
            >
              {member.is_ai ? "AI" : initials(member.display_name)}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">{member.display_name}</p>
              <p className="text-xs text-muted-foreground">{ROLE_LABELS[member.role] ?? member.role}</p>
            </div>
            {member.is_ai && (
              <span className="rounded-full bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                Seat open
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs text-muted-foreground">
        {people} {people === 1 ? "person" : "people"} on the team. AI holds open seats until a teammate joins.
      </p>
    </section>
  );
}