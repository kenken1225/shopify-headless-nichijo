export function BlogListSkeleton() {
  return (
    <div className="bg-background animate-pulse">
      <section className="bg-secondary/40 py-14">
        <div className="container mx-auto px-4 space-y-3">
          <div className="h-4 w-16 bg-muted rounded" />
          <div className="h-8 w-32 bg-muted rounded" />
          <div className="h-4 w-96 max-w-full bg-muted rounded" />
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg border border-border bg-card px-5 py-6 space-y-4">
                <div className="aspect-video bg-muted rounded" />
                <div className="space-y-2">
                  <div className="h-3 w-16 bg-muted rounded" />
                  <div className="h-5 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
                <div className="h-4 w-24 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
