import Featured from "@/components/portfolio/featured";
import Contact from "@/components/contact/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FeaturedBlog from "@/components/blog/featuredblog";

export default async function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl py-4">Hi, I'm Dave.</h1>
        <h2 className="text-2xl">I like to build things.</h2>
        <p>Sometimes, they are good.</p>
        <div className="flex gap-4 py-4">
          <Button variant="outline" asChild>
            <Link href="/resume.pdf">
              Résumé.
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/portfolio">
              Portfolio.
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl py-4">Things I built.</h1>
        <Featured />
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl py-4">Things I wrote.</h1>
        <FeaturedBlog />
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center p-24">
        <Contact />
      </section>
    </main>
  );
}
