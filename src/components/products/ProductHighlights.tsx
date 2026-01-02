type ProductHighlightsProps = {
  items: string[];
};

export function ProductHighlights({ items }: ProductHighlightsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-foreground">Highlights</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
