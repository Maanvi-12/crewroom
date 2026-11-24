import type { LucideIcon } from "lucide-react";

type Props = { title: string; description: string; icon: LucideIcon };

export function ComingSoonCard({ title, description, icon: Icon }: Props) {
  return (
    <section className="rounded-xl border border-dashed p-6">
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-muted-foreground" aria-hidden />
        <h2 className="font-semibold">{title}</h2>
        <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
          Coming soon
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{description}</p>
    </section>
  );
}