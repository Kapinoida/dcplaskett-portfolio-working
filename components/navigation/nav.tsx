
import Link from "next/link";
import { ModeToggle } from "../ui/mode-toggle";

export default function Nav() {

    return (
        <header className="bg-slate p-4 pt-8">
            <nav className="flex justify-center">
                <ul className="flex justify-between gap-16">
                    <li>
                        <Link href="/">David Plaskett.</Link>
                    </li>
                    <li>
                        <Link href="/portfolio">Portfolio.</Link>
                    </li>
                    <li>
                        <Link href="/blog">Blog.</Link>
                    </li>
                    <li>
                        <Link href="/about">About.</Link>
                    </li>
                </ul>
            </nav>
                <div className="absolute right-6 top-6">
                    <ModeToggle />
                </div>
        </header>
    )
}