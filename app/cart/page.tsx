import { Container } from "@/components/layout/Container";
import { YouMayAlsoLike } from "@/components/products/YouMayAlsoLike";
import { getProductRecommendations } from "@/lib/shopify/products";
import Link from "next/link";
import { Suspense } from "react";
import { CartContent } from "@/components/cart/CartContent";
import { CartSkeleton } from "@/components/skeletons";
import { getCart } from "@/lib/shopify/cart";
import { cookies } from "next/headers";

export const revalidate = 3600;

export default async function CartPage() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;
  const initialCart = cartId ? await getCart(cartId) : null;

  const firstProductId = initialCart?.lines?.[0]?.merchandise?.product?.id ?? null;

  let recommendations: {
    title: string;
    price: string;
    href: string;
    imageUrl?: string | null;
    imageAlt?: string | null;
    secondaryImageUrl?: string | null;
    variantId?: string;
    available?: boolean;
  }[] = [];

  if (firstProductId) {
    const recommendationsData = await getProductRecommendations(firstProductId);
    recommendations = recommendationsData.map((rec) => ({
      title: rec.title,
      price: rec.priceFormatted,
      href: `/products/${rec.handle}`,
      imageUrl: rec.imageUrl,
      imageAlt: rec.imageAlt,
      secondaryImageUrl: rec.secondaryImageUrl,
      variantId: rec.variantId,
      available: rec.available,
    }));
  }

  return (
    <div className="bg-background">
      <section className="border-b border-border">
        <Container className="py-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Home
          </Link>{" "}
          / Cart
        </Container>
      </section>

      <section className="py-10">
        <Container className="text-center">
          <h1 className="text-2xl font-semibold text-foreground">Your Cart</h1>
        </Container>
      </section>

      <section className="py-10">
        <Container>
          <Suspense fallback={<CartSkeleton />}>
            <CartContent cartId={cartId ?? null} initialCart={initialCart} />
          </Suspense>
        </Container>
      </section>

      <YouMayAlsoLike
        items={recommendations.length ? recommendations : undefined}
        useRecentLocalStorage
        showAddButton={false}
        variant="default"
        title="You May Also Like"
      />
    </div>
  );
}
