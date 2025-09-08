import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserIdFromRequest } from "@/lib/auth";

// GET /api/cart/[id]
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // <- IS a Promise in Next.js 15+
) {
  try {
    const { id } = await context.params; // await the params Promise

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
  context: { params: Promise<{ id: string }> } // <- IS a Promise in Next.js 15+
) {
  try {
    const { id } = await context.params; // await the params Promise

    const userId = getUserIdFromRequest(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { quantity } = body;

    if (quantity === undefined || quantity < 0)
      return NextResponse.json(
        { error: "Valid quantity is required" },
        { status: 400 }
      );

    const updatedCartItem = await prisma.cartItem.update({
      where: { userId_itemId: { userId, itemId: id } },
      data: { quantity: parseInt(quantity) },
      include: { item: true },
    });

    return NextResponse.json({
      message: "Cart item updated",
      cartItem: updatedCartItem,
    });
  } catch (error) {
    console.error("Update cart item error:", error);

    // Handle case where cart item doesn't exist
    if (
      error instanceof Error &&
      error.message.includes("Record to update not found")
    ) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/cart/[id]
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } // <- IS a Promise in Next.js 15+
) {
  try {
    const { id } = await context.params; // await the params Promise

    const userId = getUserIdFromRequest(request);
    if (!userId)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    await prisma.cartItem.delete({
      where: { userId_itemId: { userId, itemId: id } },
    });

    return NextResponse.json({ message: "Cart item removed from cart" });
  } catch (error) {
    console.error("Delete cart item error:", error);

    // Handle case where cart item doesn't exist
    if (
      error instanceof Error &&
      error.message.includes("Record to delete does not exist")
    ) {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
