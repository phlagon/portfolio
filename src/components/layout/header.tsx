
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects/project-3/", label: "Logo Design" },
  { href: "/projects/project-logo-redesign/", label: "Logo Redesign" },
  { href: "/#projects", label: "Portfolio" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/10 bg-background/80 backdrop-blur-md">
      <div className="container flex h-20 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-black font-headline tracking-tighter">Benzitta.</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            // Only apply active state logic after mounting to avoid hydration errors
            const isActive = mounted && (pathname === link.href || (pathname.startsWith('/projects/') && link.href === '/#projects' && !pathname.includes('project-3') && !pathname.includes('project-logo-redesign')));
            const isSpecificActive = mounted && pathname === link.href;
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary uppercase tracking-widest text-[10px] font-black",
                  isSpecificActive || (isActive && link.href === '/#projects') ? "text-primary" : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
