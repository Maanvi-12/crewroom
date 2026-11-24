import Link from "next/link";
import type { ReactNode } from "react";
import { Bot, LayoutDashboard, ListTodo, User } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, ready: true },
  { label: "Task board", href: "#", icon: ListTodo, ready: false },
  { label: "AI senior", href: "#", icon: Bot, ready: false },
  { label: "Profile", href: "#", icon: User, ready: false },
];

export function AppShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="border-b bg-muted/30 md:w-60 md:shrink-0 md:border-b-0 md:border-r">
        <div className="px-6 py-5">
          <Link href="/" className="text-lg font-bold">
            Crewroom
          </Link>
        </div>
        <nav aria-label="Main" className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col">
          {NAV.map(({ label, href, icon: Icon, ready }) => {
            const isActive = label === active;
            const classes = cn(
              "flex shrink-0 items-center gap-3 rounded-lg px-3 py-2 text-sm",
              isActive ? "bg-background font-semibold shadow-sm" : "text-muted-foreground",
              ready && !isActive && "hover:bg-background hover:text-foreground",
            );

            if (!ready) {
              return (
                <span key={label} className={cn(classes, "cursor-not-allowed opacity-60")} aria-disabled="true">
                  <Icon className="size-4" aria-hidden />
                  {label}
                  <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase">
                    Soon
                  </span>
                </span>
              );
            }

            return (
              <Link key={label} href={href} className={classes} aria-current={isActive ? "page" : undefined}>
                <Icon className="size-4" aria-hidden />
                {label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <div className="flex-1">{children}</div>
    </div>
  );
}