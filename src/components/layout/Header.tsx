import Link from "next/link";
import { Container } from "./Container";
import { Navigation } from "../navigation";

import { Image } from "@/components/shared/Image";
import { getMenu } from "@/lib/shopify/navigation";

export async function Header() {
  const menu = await getMenu("header-main");
  const menuItems = menu?.items ?? [];

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="text-xl font-semibold tracking-tight text-foreground">
          <Image src="/logo-nichijo.png" alt="Nichijo Logo" width={90} height={90} />
        </Link>
        <Navigation menuItems={menuItems} />
      </Container>
    </header>
  );
}
