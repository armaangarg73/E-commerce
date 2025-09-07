import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

// GET: Fetch all cart items for the user
export async function GET(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId },
      include: { item: true },
      orderBy: { createdAt: "desc" },
    });

    const total = cartItems.reduce(
      (sum, cartItem) => sum + cartItem.item.price * cartItem.quantity,
      0
    );

    return NextResponse.json({
      cartItems,
      total: parseFloat(total.toFixed(2)),
    });
  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST: Add new item to cart or update quantity if it exists
export async function POST(request: NextRequest) {
  try {
    const userId = getUserIdFromRequest(request);

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { itemId, quantity = 1 } = body;

    if (!itemId) {
      return NextResponse.json(
        { error: "Item ID is required" },
        { status: 400 }
      );
    }

    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    const existingCartItem = await prisma.cartItem.findUnique({
      where: { userId_itemId: { userId, itemId } },
    });

    if (existingCartItem) {
      const updatedCartItem = await prisma.cartItem.update({
        where: { id: existingCartItem.id },
        data: { quantity: existingCartItem.quantity + quantity },
        include: { item: true },
      });
      return NextResponse.json({
        message: "Cart item updated",
        cartItem: updatedCartItem,
      });
    } else {
      const cartItem = await prisma.cartItem.create({
        data: { userId, itemId, quantity },
        include: { item: true },
      });
      return NextResponse.json({ message: "Item added to cart", cartItem });
    }
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
