import Link from "next/link";
import { Button } from "../ui/button";


export default function Links( {github, live}: { github: string, live: string} ) {
    return (
        <div className="flex flex-col items-center justify-start px-4">
            <p className="text-s font-bold text-center p-2">Links</p>
            <div className="flex flex-wrap gap-4 justify-center">
                <Button size={"sm"} variant="outline" asChild>
                    <Link href={github}>
                        Github.
                    </Link>
                </Button>
                <Button size={"sm"} variant="outline" asChild>
                    <Link href={live}>
                        Live.
                    </Link>
                </Button>
            </div>
        </div>
    );
}