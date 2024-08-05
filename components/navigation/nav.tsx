


export default function Nav() {

    return (
        <header className="bg-slate p-4">
            <nav className="flex justify-center">
                <ul className="flex justify-between gap-16">
                    <li>
                        <a href="/">dcplaskett</a>
                    </li>
                    <li>
                        <a href="/portfolio">Portfolio</a>
                    </li>
                    <li>
                        <a href="/blog">Blog</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}