'use client'
import { useEffect, useState } from "react"

export default function Footer() {
    const footerText = [
        'Brewed from organic pixels.',
        'Grown in gigabit gardens.',
        'Simmered in a semiconductor reduction.',
        'Functions served farm-to-table.',
        'Plated atop micro-greens.',
        'Barbecued over an open firewall.',
        'Garnished with fresh metadata',
        'Tossed with a mixed array salad.',
        'Scrambled with free-range megs.',
    ];

    const getRandomText = () => footerText[Math.floor(Math.random() * footerText.length)];

    const [customText, setCustomText] = useState('');

    useEffect(() => {
        setCustomText(getRandomText());
    }, []);

    return (
        <footer className="bg-slate p-4 flex flex-col items-center justify-center text-sm">
            <p>
                © {new Date().getFullYear()} David Plaskett. {customText}
            </p>
            <p>
                github
            </p>
        </footer>
    )
}
