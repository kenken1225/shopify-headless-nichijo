import Image from "next/image";
import { ShopifyImage } from "@/lib/types/shopify";

type ProductGalleryProps = {
  images: ShopifyImage[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [main, ...rest] = images;

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-muted/40">
        {main ? (
          <Image
            src={main.url}
            alt={main.altText ?? title}
            fill
            sizes="(min-width: 1024px) 520px, 90vw"
            className="object-cover"
            priority
          />
        ) : null}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[main, ...rest]
          .filter(Boolean)
          .slice(0, 4)
          .map((img, idx) => (
            <div key={`${img!.url}-${idx}`} className="relative aspect-square overflow-hidden rounded-md bg-muted/60">
              <Image src={img!.url} alt={img!.altText ?? title} fill sizes="150px" className="object-cover" />
            </div>
          ))}
      </div>
    </div>
  );
}
