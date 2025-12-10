'use client'


import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { ModeToggle } from "../ui/mode-toggle";
import { FaBars } from "react-icons/fa6";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Portfolio.", href: "/portfolio" },
    { name: "Blog.", href: "/blog" },
    { name: "About.", href: "/about" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="bg-background p-4 pt-8 relative z-50"> 
      <nav className="flex justify-center">
        <ul className="justify-between gap-16 hidden md:flex items-center">
          <li>
            <Link 
                href="/" 
                className={cn("transition-colors hover:text-primary", pathname === '/' ? "font-bold text-primary" : "text-muted-foreground")}
            >
                David Plaskett.
            </Link>
          </li>
          {navItems.map((item) => (
             <li key={item.href}>
                <Link 
                    href={item.href}
                    className={cn("transition-colors hover:text-primary", isActive(item.href) ? "font-bold text-primary" : "text-muted-foreground")}
                >
                    {item.name}
                </Link>
             </li>
          ))}
        </ul>

        {/* Hamburger Icon (visible on mobile) */}
        <button
          className="md:hidden absolute left-9 top-9"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>
      </nav>

      {/* Mobile Menu (initially hidden) */}
      {isMobileMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-background p-4 z-50 md:hidden shadow-lg border-b">
          <ul className="flex flex-col gap-4 items-center text-center mx-4 pb-4">
             <li>
               <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className={cn(pathname === '/' ? "font-bold" : "")}>Home.</Link>
             </li>
             {navItems.map((item) => (
                <li key={item.href}>
                    <Link 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        href={item.href}
                        className={cn(isActive(item.href) ? "font-bold" : "")}
                    >
                        {item.name}
                    </Link>
                </li>
             ))}
            <li className="pt-2">
              <ModeToggle />
            </li>
          </ul>
        </div>
      )}

      {/* Mode Toggle (always visible on desktop) */}
      <div className="hidden md:absolute right-6 top-6 md:block"> 
        <ModeToggle />
      </div>

      {/* "David Plaskett." (always visible) */}
       <h1 className="text-center md:hidden absolute top-8 left-0 right-0 pointer-events-none"> 
         <Link href="/" className="pointer-events-auto">David Plaskett.</Link>
      </h1> 
    </header>
  );
}