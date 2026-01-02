import Link from "next/link";
import { Container } from "./Container";

const navLinks = [
  { href: "/products", label: "Shop" },
  { href: "/blog", label: "Culture" },
  { href: "/about", label: "About" },
  { href: "/cart", label: "Cart" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
          KŌBAI
        </Link>
        <nav className="flex items-center gap-6 text-sm text-muted-foreground">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
