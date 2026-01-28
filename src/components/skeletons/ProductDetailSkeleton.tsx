export function ProductDetailSkeleton() {
  return (
    <div className="bg-background animate-pulse">
      <section className="pt-10 md:pt-12">
        <div className="container mx-auto px-4">
          <div className="h-4 w-36 bg-muted rounded" />
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg" />
              <div className="flex gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-20 h-20 bg-muted rounded" />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <div className="h-8 w-3/4 bg-muted rounded" />
                <div className="h-6 w-24 bg-muted rounded" />
              </div>

              <div className="space-y-3">
                <div className="h-4 w-16 bg-muted rounded" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-10 w-20 bg-muted rounded" />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-12 w-32 bg-muted rounded" />
              </div>

              <div className="h-14 w-full bg-muted rounded" />

              <div className="space-y-2 pt-4">
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="h-6 w-40 bg-muted rounded mb-6" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-square bg-muted rounded" />
                <div className="h-4 w-3/4 bg-muted rounded" />
                <div className="h-4 w-1/2 bg-muted rounded" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
