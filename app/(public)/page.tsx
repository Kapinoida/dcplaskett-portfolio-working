import Featured from "@/components/portfolio/featured";
import Contact from "@/components/contact/contact";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FeaturedBlog from "@/components/blog/featuredblog";
import FadeInSection from "@/components/ui/fade-in-section";

export default async function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <section className="flex min-h-[90vh] flex-col items-center justify-center py-20 w-full container mx-auto">
        <FadeInSection>
            <div className="flex flex-col items-center space-y-4 mb-12 text-center">
                <h1 className="md:text-6xl text-4xl font-bold tracking-tight">Hi, I&apos;m Dave.</h1>
                <h2 className="md:text-3xl text-2xl text-muted-foreground">I like to build things.</h2>
                <p className="md:text-xl text-lg text-muted-foreground/80">Sometimes, they are good.</p>
            </div>
            <div className="flex gap-4 justify-center">
            <Button variant="outline" size="lg" asChild>
                <Link href="/resume.pdf">
                Résumé
                </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
                <Link href="/portfolio">
                Portfolio
                </Link>
            </Button>
            </div>
        </FadeInSection>
      </section>

      <section className="flex min-h-[80vh] flex-col items-center justify-center py-24 w-full container mx-auto">
        <FadeInSection>
            <h1 className="md:text-5xl text-3xl font-bold mb-16 text-center">Things I built.</h1>
            <div className="w-full">
                <Featured />
            </div>
        </FadeInSection>
      </section>

      <section className="flex min-h-[80vh] flex-col items-center justify-center py-24 w-full container mx-auto">
        <FadeInSection>
            <h1 className="md:text-5xl text-3xl font-bold mb-16 text-center">Things I wrote.</h1>
            <div className="w-full">
                <FeaturedBlog />
            </div>
        </FadeInSection>
      </section>

      <section className="flex min-h-[60vh] flex-col items-center justify-center py-24 w-full container mx-auto">
        <FadeInSection>
            <h1 className="md:text-5xl text-3xl font-bold mb-12 text-center">Get in touch.</h1>
            <Contact />
        </FadeInSection>
      </section>
    </main>
  );
}
