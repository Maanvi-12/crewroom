import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Crewroom</h1>
      <p className="max-w-md text-center text-muted-foreground">
        Real team experience before your first job.
      </p>
      <Button>Get started</Button>
    </main>
  );
}