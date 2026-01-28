import { NextResponse } from "next/server";
import { createCart, addToCart, updateCartLine, removeFromCart } from "@/lib/shopify/cart";

function setCartCookie(res: NextResponse, cartId: string) {
  res.cookies.set("cartId", cartId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 6, // 6日
    secure: true,
  });
}

export async function POST(req: Request) {
  const {
    cartId,
    merchandiseId,
    quantity = 1,
  } = (await req.json()) as {
    cartId?: string;
    merchandiseId?: string;
    quantity?: number;
  };

  if (!merchandiseId) {
    return NextResponse.json({ error: "merchandiseId is required" }, { status: 400 });
  }

  try {
    if (!cartId) {
      const { cart, cartId: newCartId } = await createCart(merchandiseId, quantity);
      const res = NextResponse.json({ cartId: newCartId, cart });
      setCartCookie(res, newCartId);
      return res;
    }

    const { cart } = await addToCart(cartId, merchandiseId, quantity);
    const res = NextResponse.json({ cartId, cart });
    setCartCookie(res, cartId);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const { cartId, lineId, quantity } = (await req.json()) as {
    cartId?: string;
    lineId?: string;
    quantity?: number;
  };

  if (!cartId || !lineId || quantity === undefined) {
    return NextResponse.json({ error: "cartId, lineId and quantity are required" }, { status: 400 });
  }

  try {
    const { cart } = await updateCartLine(cartId, lineId, quantity);
    const res = NextResponse.json({ cartId, cart });
    setCartCookie(res, cartId);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const { cartId, lineIds } = (await req.json()) as {
    cartId?: string;
    lineIds?: string[];
  };

  if (!cartId || !lineIds?.length) {
    return NextResponse.json({ error: "cartId and lineIds are required" }, { status: 400 });
  }

  try {
    const { cart } = await removeFromCart(cartId, lineIds);
    const res = NextResponse.json({ cartId, cart });
    setCartCookie(res, cartId);
    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
