import { FaEnvelopeOpen, FaGithub } from "react-icons/fa";
import { Button } from "../ui/button";
import Link from "next/link";


export default function Contact() {
    return (
        <div>
            <div className="flex flex-col items-center justify-center pt-24 m-4">
                <h1 className="md:text-4xl text-3xl py-2">Get in touch.</h1>
                <div className="flex gap-4 py-4 justify-center">
                    <Button variant="outline" asChild>
                        <Link href="/resume.pdf">
                        Résumé.
                        </Link>
                    </Button>
                </div>
                <div className="flex gap-4 md:text-2xl text-lg pt-4 justify-center">
                    <a href="https://github.com/Kapinoida" target="_blank" rel="noreferrer">
                        <FaGithub />
                    </a>
                    <a href="mailto:dcplaskett@gmail.com" target="_blank" rel="noreferrer">
                        <FaEnvelopeOpen />
                    </a>
                </div>
            </div>
        </div>
    )
}