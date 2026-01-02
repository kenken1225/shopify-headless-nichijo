import { Container } from "@/components/layout/Container";
import { CheckCircle } from "lucide-react";

type Point = {
  title: string;
  description: string;
};

const points: Point[] = [
  {
    title: "Premium素材 & 心地よい着用感",
    description: "100%コットンで軽やか、日常使いしやすいリラックスフィット。",
  },
  {
    title: "こだわりのデザイン",
    description: "日本の文化・アートに着想を得たオリジナルグラフィック。",
  },
  {
    title: "安心の配送と返品",
    description: "追跡付きで世界150か国にお届け。30日間の返品ポリシー。",
  },
  {
    title: "持続可能なものづくり",
    description: "環境配慮の生産背景を選択し、品質と持続性を両立。",
  },
];

export function WhyLoveIt() {
  return (
    <section className="bg-secondary/30 py-12">
      <Container className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Why You'll Love It</p>
          <h2 className="text-2xl font-semibold text-foreground">選ばれる理由</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {points.map((item) => (
            <div key={item.title} className="flex gap-3 rounded-lg border border-border bg-card p-4 shadow-sm">
              <CheckCircle className="h-5 w-5 text-accent shrink-0" />
              <div className="space-y-1">
                <h3 className="text-sm font-medium text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
