"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { ROUTES } from "@/lib/constants";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.home} className="flex items-center" onClick={closeMenu}>
            <Logo variant="horizontal" size="sm" />
          </Link>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href={ROUTES.escuelas}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Escuelas
            </Link>
            <Link
              href={ROUTES.sponsors}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Sponsors
            </Link>
            <Link
              href={ROUTES.faq}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              FAQ
            </Link>
            <Link
              href={ROUTES.legal}
              className="text-dark hover:text-primary transition-colors font-medium"
            >
              Legal
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-dark focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Menú"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4 pt-4">
              <Link
                href={ROUTES.escuelas}
                className="text-dark hover:text-primary transition-colors font-medium"
                onClick={closeMenu}
              >
                Escuelas
              </Link>
              <Link
                href={ROUTES.sponsors}
                className="text-dark hover:text-primary transition-colors font-medium"
                onClick={closeMenu}
              >
                Sponsors
              </Link>
              <Link
                href={ROUTES.faq}
                className="text-dark hover:text-primary transition-colors font-medium"
                onClick={closeMenu}
              >
                FAQ
              </Link>
              <Link
                href={ROUTES.legal}
                className="text-dark hover:text-primary transition-colors font-medium"
                onClick={closeMenu}
              >
                Legal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
