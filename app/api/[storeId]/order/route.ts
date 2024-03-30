import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { orderId, isPaid } = await req.json();

    if (!orderId) {
      return new NextResponse("OrderId is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const order = await prismadb.order.updateMany({
      where: {
        id: orderId,
        storeId: params.storeId,
      },
      data: {
        isPaid,
      },
    });
    return NextResponse.json("Order is paid", { headers: corsHeaders });
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("product id is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
