import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
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
  const { name, email, opgg, cartItems } = await req.json();

  if (!cartItems || cartItems.length === 0) {
    return new NextResponse("Products are required", { status: 400 });
  }
  const productIds = cartItems.map((item: any) => item.productId);

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds,
      },
    },
  });

  const order = await prismadb.order.create({
    data: {
      storeId: params.storeId,
      isPaid: false,
      email: email, // Add the missing 'email' property
      fullName: name, // Add the missing 'fullName' property
      opgg: opgg, // Add the missing 'opgg' property
      orderItems: {
        create: productIds.map((productId: string) => ({
          product: {
            connect: {
              id: productId,
            },
          },
          quantity: cartItems.find((item: any) => item.productId === productId)
            .quantity,
        })),
      },
    },
  });
  return NextResponse.json({ submitted: true }, { headers: corsHeaders });
}
