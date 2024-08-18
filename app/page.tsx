import Featured from "@/components/portfolio/featured";
import Contact from "@/components/contact/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FeaturedBlog from "@/components/blog/featuredblog";

export default async function Home() {
  return (
    <main>
      <section className="flex min-h-screen flex-col items-center justify-center pt-24 mx-4">
        <h1 className="md:text-4xl text-3xl py-4">Hi, I`&apos;`m Dave.</h1>
        <h2 className="md:text-2xl text-xl">I like to build things.</h2>
        <p className="md:text-lg text-md">Sometimes, they are good.</p>
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

      <section className="flex min-h-screen flex-col items-center justify-center pt-24 mx-4">
        <h1 className="md:text-4xl text-3xl py-4">Things I built.</h1>
        <Featured />
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center pt-24 mx-4">
        <h1 className="md:text-4xl text-3xl py-4">Things I wrote.</h1>
        <FeaturedBlog />
      </section>

      <section className="flex min-h-screen flex-col items-center justify-center pt-24 mx-4">
        <Contact />
      </section>
    </main>
  );
}
