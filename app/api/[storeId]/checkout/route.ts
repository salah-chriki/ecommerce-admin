import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { useEffect } from "react";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { name, email, opgg, cartItems } = await req.json();

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!opgg) {
      return new NextResponse("OPGG is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    if (!cartItems || cartItems.length === 0) {
      return new NextResponse("Products are required", { status: 400 });
    }
    const productIds = cartItems.map((item: any) => item.product.id);

    const products = await prismadb.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    const postOrder = await prismadb.order.create({
      data: {
        storeId: params.storeId,
        isPaid: false,
        email: email,
        fullName: name,
        opgg: opgg,
        orderItems: {
          create: productIds.map((productId: string) => ({
            product: {
              connect: {
                id: productId,
              },
            },
            quantity: cartItems.find(
              (item: any) => item.product.id === productId
            ).quantity,
          })),
        },
      },
    });
    return NextResponse.json(
      { orderId: postOrder.id },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.log("[UNPAID_ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
