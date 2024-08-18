'use client'


import Link from "next/link";
import { useState } from "react";
import { ModeToggle } from "../ui/mode-toggle";
import { FaBars } from "react-icons/fa6";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-slate p-4 pt-8 relative"> 
      <nav className="flex justify-center">
        <ul className="justify-between gap-16 hidden md:flex">
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
        <div className="absolute top-16 left-0 w-full bg-slate p-4 z-10 md:hidden">
          <ul className="flex gap-4 justify-between items-center text-center mx-4">
            <li>
              <Link onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} href="/portfolio">Portfolio.</Link>
            </li>
            <li>
              <Link onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} href="/blog">Blog.</Link>
            </li>
            <li>
              <Link onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} href="/about">About.</Link>
            </li>
            <li>
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
      <h1 className="text-center md:hidden"> {/* Adjust alignment for mobile */}
        <Link href="/">David Plaskett.</Link>
      </h1> 
    </header>
  );
}