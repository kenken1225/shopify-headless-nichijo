import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { formatPrice, shopifyFetch } from "@/lib/shopify";
import { WhyLoveIt } from "@/components/products/WhyLoveIt";
import { CustomerReviews } from "@/components/products/CustomerReviews";
import { YouMayAlsoLike } from "@/components/products/YouMayAlsoLike";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductInfo } from "@/components/products/ProductInfo";
import { ProductHighlights } from "@/components/products/ProductHighlights";
import { ProductBreadcrumb } from "@/components/products/ProductBreadcrumb";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/shopify/queries";
import { ShopifyImage } from "@/lib/types/shopify";

type ProductQuery = {
  product: {
    title: string;
    description: string;
    handle: string;
    featuredImage?: ShopifyImage | null;
    images: { edges: { node: ShopifyImage }[] };
    variants: { edges: { node: { id: string; title: string; price: { amount: string; currencyCode: string } } }[] };
  } | null;
};

type ProductPageProps = {
  params: Promise<{ handle: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  if (!handle) {
    notFound();
  }
  const data = await shopifyFetch<ProductQuery>(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data?.product;

  if (!product) {
    notFound();
  }

  const imagesSet = new Map<string, ShopifyImage>();
  if (product.featuredImage) {
    imagesSet.set(product.featuredImage.url, product.featuredImage);
  }
  (product.images?.edges ?? []).forEach(({ node }) => {
    if (!imagesSet.has(node.url)) {
      imagesSet.set(node.url, node);
    }
  });
  const images = Array.from(imagesSet.values());
  const mainImage = images[0];
  const priceNode = product.variants?.edges?.[0]?.node?.price;
  const price = priceNode ? formatPrice(priceNode.amount, priceNode.currencyCode) : "";
  const highlights = ["Worldwide shipping with tracking", "30-day hassle-free returns", "Secure payments"];

  return (
    <div className="bg-background">
      <section className="pt-12">
        <Container className="space-y-3">
          <ProductBreadcrumb
            items={[{ label: "Home", href: "/" }, { label: "Products", href: "/products" }, { label: product.title }]}
          />
        </Container>
      </section>

      <section className="py-12">
        <Container className="grid gap-10 md:grid-cols-2">
          <ProductGallery images={images} title={product.title} />
          <ProductInfo title={product.title} price={price} description={product.description}>
            <ProductHighlights items={highlights} />
          </ProductInfo>
        </Container>
      </section>

      <WhyLoveIt />
      <CustomerReviews />
      <YouMayAlsoLike />
    </div>
  );
}
