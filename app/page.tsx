import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-start p-24">
        <h1 className="text-4xl">Hi, I'm Dave.</h1>
        <h2 className="text-2xl">I like to build things.</h2>
        <p>Sometimes, they are good.</p>
        <div className="flex gap-4 py-4">
          <Button variant="outline" asChild>
            <Link href="/resume.pdf">
              Résumé
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portfolio">
              Portfolio
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
