import { FaEnvelopeOpen, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";
import { Card } from "../ui/card";


export default function Contact() {
    return (
        <div>
            <Card className="flex flex-col items-center justify-center px-24 py-6 m-8">
                <h1 className="text-4xl py-2">Get in touch.</h1>
                <div className="flex gap-4 py-4 justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/resume.pdf">
                        Résumé.
                        </Link>
                    </Button>
                </div>
                <div className="flex gap-4 text-2xl pt-4 justify-center">
                    <a href="https://github.com/Kapinoida" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="mailto:dcplaskett@gmail.com" target="_blank" rel="noreferrer">
                        <FaEnvelopeOpen />
                    </a>
                </div>
            </Card>
        </div>
    )
}