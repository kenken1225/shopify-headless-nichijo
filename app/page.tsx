import { Hero } from "@/components/sections/Hero";
import { Trust } from "@/components/sections/Trust";
import { CategoryGrid } from "@/components/sections/CategoryGrid";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { About } from "@/components/sections/About";
import { Blog } from "@/components/sections/Blog";
import { CTA } from "@/components/sections/CTA";

const mockProducts = [
  { title: "Minimal Wave Tee", price: "$42.00", href: "/products/minimal-wave-tee" },
  { title: "Zen Garden Print", price: "$28.00", href: "/products/zen-garden-print" },
  { title: "Ceramic Tea Set", price: "$68.00", href: "/products/ceramic-tea-set" },
  { title: "Canvas Tote", price: "$32.00", href: "/products/canvas-tote" },
];

const mockPosts = [
  {
    title: "The Art of Wabi-Sabi in Modern Design",
    excerpt: "Exploring how traditional aesthetics influence contemporary anime art.",
    href: "/blog/wabi-sabi-design",
  },
  {
    title: "Behind the Scenes: Artist Collaborations",
    excerpt: "Meet the creators bringing unique visions to life through limited drops.",
    href: "/blog/artist-collaborations",
  },
  {
    title: "Street Culture: Tokyo to the World",
    excerpt: "How urban Japanese fashion trends inspire global merchandise design.",
    href: "/blog/street-culture",
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Trust />
      <CategoryGrid />
      <FeaturedProducts products={mockProducts} />
      <About />
      <Blog posts={mockPosts} />
      <CTA />
    </>
  );
}
