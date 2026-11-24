export type TeamMember = {
  id: number;
  display_name: string;
  role: string;
  is_ai: boolean;
};

export type Team = {
  id: number;
  name: string;
  stack: string;
  project_size: string;
  country: string;
  status: string;
  members: TeamMember[];
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

export const ROLE_LABELS: Record<string, string> = {
  developer: "Developer",
  tester: "Tester",
  scrum_master: "Scrum master",
  project_manager: "Project manager",
};

/** Returns the user's team, or null if they aren't on one yet. */
export async function fetchMyTeam(): Promise<Team | null> {
  const response = await fetch(`${API_URL}/teams/me`);
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}