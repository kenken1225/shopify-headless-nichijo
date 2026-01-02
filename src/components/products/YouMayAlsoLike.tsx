import { Container } from "@/components/layout/Container";
import { ProductCard } from "@/components/products/ProductCard";

type Recommendation = {
  title: string;
  price: string;
  href: string;
  imageUrl?: string;
  imageAlt?: string | null;
};

// Figmaに合わせた横並び4枚のモック
const mockRecommendations: Recommendation[] = [
  { title: "Zen Garden Art Print", price: "$32.00", href: "/products/zen-garden-print" },
  { title: "Minimal Hoodie", price: "$68.00", href: "/products/minimal-hoodie" },
  { title: "Ceramic Tea Set", price: "$68.00", href: "/products/ceramic-tea-set" },
  { title: "Canvas Tote Bag", price: "$32.00", href: "/products/canvas-tote" },
];

type YouMayAlsoLikeProps = {
  items?: Recommendation[];
};

export function YouMayAlsoLike({ items = mockRecommendations }: YouMayAlsoLikeProps) {
  return (
    <section className="bg-secondary/15 py-12">
      <Container className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">You May Also Like</p>
          <h2 className="text-2xl font-semibold text-foreground">こちらもおすすめ</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <ProductCard
              key={item.href}
              title={item.title}
              price={item.price}
              href={item.href}
              imageUrl={item.imageUrl}
              imageAlt={item.imageAlt}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
