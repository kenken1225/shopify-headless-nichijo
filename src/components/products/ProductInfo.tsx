import { Button } from "@/components/ui/Button";

type ProductInfoProps = {
  title: string;
  price: string;
  description: string;
  children?: React.ReactNode;
};

export function ProductInfo({ title, price, description, children }: ProductInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">{title}</h2>
        <p className="text-xl font-medium text-foreground">{price}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {children}

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Button className="px-5 py-3">Add to Cart</Button>
          <Button variant="ghost">Buy Now</Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Ships in 2-4 business days. 30-day hassle-free returns worldwide.
        </p>
      </div>
    </div>
  );
}
