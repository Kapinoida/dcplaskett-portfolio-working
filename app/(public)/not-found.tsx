
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <div className="flex min-h-[70vh] flex-col items-center justify-center text-center space-y-8">
            <h1 className="text-9xl font-bold text-primary/20">404</h1>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold">Page not found.</h2>
                <p className="text-muted-foreground text-lg">Sorry, we couldn&apos;t find the page you&apos;re looking for.</p>
            </div>
            <Button asChild size="lg">
                <Link href="/">
                    Return Home
                </Link>
            </Button>
        </div>
    );
}