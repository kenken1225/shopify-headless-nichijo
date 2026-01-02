import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/products/ProductCard";
import { formatPrice, shopifyFetch } from "@/lib/shopify";
import { PRODUCTS_LIST_QUERY } from "@/lib/shopify/queries";
import { ShopifyImage } from "@/lib/types/shopify";

type ProductsQuery = {
  products: {
    edges: {
      node: {
        handle: string;
        title: string;
        featuredImage?: ShopifyImage | null;
        images: { edges: { node: ShopifyImage }[] };
        priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
      };
    }[];
  };
};

export default async function ProductsPage() {
  const data = await shopifyFetch<ProductsQuery>(PRODUCTS_LIST_QUERY);
  const products = data?.products?.edges ?? [];

  return (
    <div className="bg-background">
      <section className="bg-secondary/40 py-14">
        <Container className="space-y-3 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Product Collection</p>
          <h1 className="text-3xl font-semibold text-foreground">Featured Products</h1>
          <p className="text-sm text-muted-foreground">Curated pieces celebrating Japanese creativity.</p>
        </Container>
      </section>

      <section className="py-12">
        <Container className="space-y-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map(({ node }) => {
              const image = node.featuredImage ?? node.images?.edges?.[0]?.node;
              const price = formatPrice(
                node.priceRange.minVariantPrice.amount,
                node.priceRange.minVariantPrice.currencyCode
              );
              return (
                <ProductCard
                  key={node.handle}
                  title={node.title}
                  price={price}
                  href={`/products/${node.handle}`}
                  imageUrl={image?.url}
                  imageAlt={image?.altText}
                />
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
