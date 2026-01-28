"use client";

import { CartWithLines } from "@/lib/shopify/cart";
import { formatPrice } from "@/lib/shopify";
import Image from "next/image";
import { Globe2, RotateCcw, ShieldCheck, XIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { useCart } from "@/contexts/CartContext";

type CartContentProps = {
  cartId: string | null;
  initialCart: CartWithLines | null;
};

export function CartContent({ cartId, initialCart }: CartContentProps) {
  const { setItemCount } = useCart();
  const [cart, setCart] = useState<CartWithLines | null>(initialCart);
  const [loadingLineId, setLoadingLineId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(initialCart?.checkoutUrl ?? null);
  const [cartIsEmpty, setCartIsEmpty] = useState(!(initialCart?.lines?.length ?? 0));

  const handleQuantityChange = async (cartId: string, lineId: string, nextQuantity: number) => {
    if (!cartId || !lineId) return;
    if (nextQuantity < 1) {
      try {
        setLoadingLineId(lineId);
        setError(null);
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId, lineIds: [lineId] }),
        });
        const data = await res.json();
        if (!res.ok) {
          setError(data?.error ?? "Failed to remove item, please try again");
          return;
        }
        checkCartIsEmpty(data?.cart?.lines?.length ?? 0);
        setCart(data?.cart);
        setCheckoutUrl(data?.cart?.checkoutUrl ?? null);
        setItemCount(data?.cart?.totalQuantity ?? 0);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error, please try again");
      } finally {
        setLoadingLineId(null);
      }
      return;
    }

    try {
      setLoadingLineId(lineId);
      setError(null);
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cartId,
          lineId,
          quantity: nextQuantity,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Failed to change quantity, please try again");
        return;
      }
      checkCartIsEmpty(data?.cart?.lines?.length ?? 0);
      setCart(data?.cart);
      setCheckoutUrl(data?.cart?.checkoutUrl ?? null);
      setItemCount(data?.cart?.totalQuantity ?? 0);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unknown error, please try again");
    } finally {
      setLoadingLineId(null);
    }
  };

  const checkCartIsEmpty = (cartLength: number | null) => {
    if (cartLength === 0) {
      setCartIsEmpty(true);
    } else {
      setCartIsEmpty(false);
    }
  };

  const subtotal = cart?.cost?.subtotalAmount
    ? formatPrice(cart.cost.subtotalAmount.amount, cart.cost.subtotalAmount.currencyCode)
    : "$0.00";
  const total = cart?.cost?.totalAmount
    ? formatPrice(cart.cost.totalAmount.amount, cart.cost.totalAmount.currencyCode)
    : "$0.00";

  return (
    <>
      {error && <div className="text-red-500 text-center">{error}</div>}
      {!cartIsEmpty ? (
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="divide-y divide-border border border-border rounded-lg bg-card">
              {cart?.lines.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[auto,80px] items-center gap-4 px-6 py-4 md:grid-cols-3 relative"
                >
                  <div className="h-[120px] w-[120px] overflow-hidden rounded bg-muted/60 flex items-center justify-center">
                    <Image
                      src={item.merchandise.product.featuredImage?.url ?? "/images/placeholder.png"}
                      alt={item.merchandise.product.title}
                      width={120}
                      height={120}
                    />
                  </div>
                  <div>
                    <div className="text-sm text-foreground font-medium">{item.merchandise.product.title}</div>
                    {item.merchandise.selectedOptions?.length ? (
                      <div className="text-[11px] text-muted-foreground mt-1 space-y-0.5">
                        {item.merchandise.selectedOptions.map((opt) => (
                          <div key={`${opt.name}-${opt.value}`}>
                            {opt.name}: {opt.value}
                          </div>
                        ))}
                      </div>
                    ) : null}

                    <div className="mt-2 flex align-center justify-between items-center gap-3 text-sm rounded border border-border p-1">
                      <button
                        className="h-8 w-8 text-muted-foreground disabled:opacity-50"
                        onClick={() => handleQuantityChange(cartId ?? "", item.id, item.quantity - 1)}
                        disabled={loadingLineId === item.id}
                      >
                        -
                      </button>
                      {loadingLineId === item.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                      ) : (
                        <span className="text-foreground">{item.quantity}</span>
                      )}
                      <button
                        className="h-8 w-8 text-muted-foreground disabled:opacity-50 cursor-pointer"
                        onClick={() => handleQuantityChange(cartId ?? "", item.id, item.quantity + 1)}
                        disabled={loadingLineId === item.id}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="text-right text-sm text-muted-foreground md:text-right">
                    {formatPrice(item.cost.totalAmount.amount, item.cost.totalAmount.currencyCode || "USD")}
                  </div>
                  <div className="absolute top-5 -translate-y-1/2 right-5">
                    <button
                      className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={() => handleQuantityChange(cartId ?? "", item.id, 0)}
                    >
                      <XIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-lg p-6 space-y-4 bg-[#C77D58]/30">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between opacity-90">
                <span>Subtotal</span>
                <span>{subtotal}</span>
              </div>
              <div className="flex justify-between opacity-90">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between opacity-90">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="border-t border-white/40 pt-3 flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>{total}</span>
            </div>
            <a
              href={checkoutUrl ?? "#"}
              className="w-full block text-center rounded bg-black px-4 py-3 text-sm font-semibold text-white hover:bg-black/80"
            >
              Proceed to Checkout
            </a>
            <div className="w-full rounded border border-black px-4 py-3 text-sm font-semibold text-black hover:bg-black/10 text-center">
              <Link className="" href="/collections/all">
                Continue Shopping
              </Link>
            </div>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 mt-0.5 opacity-90" />
                <div>
                  <p className="font-semibold">Secure Checkout</p>
                  <p className="text-xs opacity-90">Your payment information is encrypted</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Globe2 className="h-5 w-5 mt-0.5 opacity-90" />
                <div>
                  <p className="font-semibold">Worldwide Shipping</p>
                  <p className="text-xs opacity-90">We ship to over 100 countries</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <RotateCcw className="h-5 w-5 mt-0.5 opacity-90" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-xs opacity-90">Simple and transparent return policies for peace of mind.</p>
                </div>
              </li>
            </ul>
          </aside>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-center">Your cart is empty</div>
          <Link href="/collections/all">
            <Button className="mt-7">Continue Shopping</Button>
          </Link>
        </div>
      )}
    </>
  );
}
