import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

// GET /api/cart/[id]
export async function GET(
  request: NextRequest,
  context: { params: { id: string } } // <- NOT a Promise
) {
  const { id } = context.params; // directly use id

  try {
    const userId = getUserIdFromRequest(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const cartItem = await prisma.cartItem.findUnique({
      where: { userId_itemId: { userId, itemId: id } },
      include: { item: true },
    });

    if (!cartItem)
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );

    return NextResponse.json({ cartItem });
  } catch (error) {
    console.error("Get cart item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// PUT /api/cart/[id]
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } } // <- NOT a Promise
) {
  const { id } = context.params;
  const userId = getUserIdFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    const { quantity } = body;
    if (quantity === undefined)
      return NextResponse.json(
        { error: "Quantity is required" },
        { status: 400 }
      );

    const updatedCartItem = await prisma.cartItem.update({
      where: { userId_itemId: { userId, itemId: id } },
      data: { quantity },
      include: { item: true },
    });

    return NextResponse.json({
      message: "Cart item updated",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    console.error("Update cart item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } } // <- NOT a Promise
) {
  const { id } = context.params;
  const userId = getUserIdFromRequest(request);
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    await prisma.cartItem.delete({
      where: { userId_itemId: { userId, itemId: id } },
    });

    return NextResponse.json({ message: "Cart item removed from cart" });
  } catch (error) {
    console.error("Delete cart item error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
