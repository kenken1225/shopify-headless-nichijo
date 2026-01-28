export function CollectionSkeleton() {
  return (
    <div className="bg-background animate-pulse">
      <section className="py-6 sm:py-10 bg-secondary/60">
        <div className="container mx-auto px-4">
          <div className="space-y-3">
            <div className="h-4 w-24 bg-muted rounded" />
            <div className="h-8 w-48 bg-muted rounded" />
            <div className="h-4 w-96 max-w-full bg-muted rounded" />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <aside className="hidden lg:block w-64 space-y-6">
              <div className="space-y-3">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-8 w-full bg-muted rounded" />
                <div className="h-8 w-full bg-muted rounded" />
              </div>
              <div className="space-y-3">
                <div className="h-4 w-24 bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
                <div className="h-4 w-full bg-muted rounded" />
              </div>
            </aside>

            <div className="flex-1">
              <div className="flex justify-between items-center mb-6">
                <div className="h-5 w-32 bg-muted rounded" />
                <div className="h-8 w-28 bg-muted rounded" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="space-y-3">
                    <div className="aspect-square bg-muted rounded" />
                    <div className="h-4 w-3/4 bg-muted rounded" />
                    <div className="h-4 w-1/2 bg-muted rounded" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
