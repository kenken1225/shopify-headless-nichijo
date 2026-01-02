import { Container } from "@/components/layout/Container";
import { Star } from "lucide-react";

type Review = {
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
};

const reviews: Review[] = [
  {
    author: "Emma K.",
    rating: 5,
    date: "2024/11/16",
    title: "Absolutely beautiful design",
    comment: "色・プリントが素敵で、柔らかい着心地。リラックスしたサイズ感でオフの日にぴったり。",
  },
  {
    author: "Yuki T.",
    rating: 4,
    date: "2024/11/14",
    title: "Worth every penny",
    comment: "日本の要素がしっかり感じられるデザインでお気に入り。生地も厚すぎず快適です。",
  },
  {
    author: "Daniel P.",
    rating: 4,
    date: "2024/11/10",
    title: "Great fabric, slightly large",
    comment: "いつもよりワンサイズ下げても良かったかも。ゆったりが好きならいつものサイズでOK。",
  },
];

function renderStars(count: number) {
  return (
    <div className="flex items-center gap-1 text-accent">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < count ? "fill-accent text-accent" : "text-muted-foreground"}`} />
      ))}
    </div>
  );
}

export function CustomerReviews() {
  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <section className="bg-secondary/20 py-12">
      <Container className="space-y-6">
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Customer Reviews</p>
          <h2 className="text-2xl font-semibold text-foreground">みんなの声</h2>
          <div className="flex items-center justify-center gap-2 text-sm text-foreground">
            {renderStars(Math.round(average))}
            <span className="font-medium">{average.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviews.length}件)</span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.title + review.author}
              className="flex h-full flex-col gap-2 rounded-lg border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{review.author}</span>
                <span>{review.date}</span>
              </div>
              <div className="flex items-center gap-2">
                {renderStars(review.rating)}
                <span className="text-xs text-muted-foreground">{review.rating}.0</span>
              </div>
              <h3 className="text-sm font-medium text-foreground">{review.title}</h3>
              <p className="text-sm text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
