
import Link from "next/link";

export default function Nav() {

    return (
        <header className="bg-slate p-4">
            <nav className="flex justify-center">
                <ul className="flex justify-between gap-16">
                    <li>
                        <Link href="/">dp.</Link>
                    </li>
                    <li>
                        <Link href="/portfolio">portfolio.</Link>
                    </li>
                    <li>
                        <Link href="/blog">blog.</Link>
                    </li>
                    <li>
                        <Link href="/about">about.</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}