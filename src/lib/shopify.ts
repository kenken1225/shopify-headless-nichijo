type GraphQLResponse<T> = {
  data?: T;
  errors?: { message: string }[];
};

const SHOP_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const STOREFRONT_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch<T>(query: string, variables: Record<string, unknown> = {}) {
  if (!SHOP_DOMAIN || !STOREFRONT_TOKEN) {
    throw new Error("SHOPIFY_STORE_DOMAIN と SHOPIFY_STOREFRONT_ACCESS_TOKEN を設定してください。");
  }

  const res = await fetch(`https://${SHOP_DOMAIN}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    // 必要に応じて ISR/キャッシュ設定を後から調整
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Shopify fetch failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as GraphQLResponse<T>;
  if (json.errors?.length) {
    throw new Error(json.errors.map((e) => e.message).join(", "));
  }
  return json.data as T;
}

export function formatPrice(amount: string, currencyCode: string) {
  const value = Number(amount);
  if (Number.isNaN(value)) return amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
  }).format(value);
}
