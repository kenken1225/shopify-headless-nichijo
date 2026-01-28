import { notFound } from "next/navigation";
import { Suspense } from "react";
import { WhyLoveIt } from "@/components/products/WhyLoveIt";
import { CustomerReviews } from "@/components/products/CustomerReviews";
import { YouMayAlsoLike } from "@/components/products/YouMayAlsoLike";
import { ProductDetail } from "@/components/products/ProductDetail";
import { Container } from "@/components/layout/Container";
import { getProductByHandle, getProductRecommendations } from "@/lib/shopify/products";
import { ProductDetailSkeleton } from "@/components/skeletons";
import Link from "next/link";

export const revalidate = 3600;

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

async function ProductContent({ handle }: { handle: string }) {
  const product = await getProductByHandle(handle);
  if (!product) {
    notFound();
  }

  const recommendationsData = product.id ? await getProductRecommendations(product.id) : [];
  const recommendations = recommendationsData.map((rec) => ({
    title: rec.title,
    price: rec.priceFormatted,
    href: `/products/${rec.handle}`,
    imageUrl: rec.imageUrl,
    imageAlt: rec.imageAlt,
    secondaryImageUrl: rec.secondaryImageUrl,
    variantId: rec.variantId,
    available: rec.available,
  }));

  return (
    <div className="bg-background">
      <section className="pt-10 md:pt-12">
        <Container className="space-y-3">
          <Link href={`/collections/all`} className="text-sm text-muted-foreground hover:text-foreground">
            Back To All Products
          </Link>
        </Container>
      </section>

      <ProductDetail
        product={{
          title: product.title,
          descriptionHtml: product.descriptionHtml,
          handle: product.handle,
          images: product.images,
          variants: product.variants,
        }}
        recommendations={recommendations}
      />

      <WhyLoveIt />
      <CustomerReviews />
      <YouMayAlsoLike
        items={recommendations.length ? recommendations : undefined}
        useRecentLocalStorage
        showAddButton
        variant="default"
        title="You May Also Like"
      />
    </div>
  );
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  if (!handle) {
    notFound();
  }

  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductContent handle={handle} />
    </Suspense>
  );
}
