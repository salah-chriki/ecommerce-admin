import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "http://localhost:3000",
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
    const { orderId } = await req.json();

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
        isPaid: true,
      },
    });
    return NextResponse.json("Order is paid", { headers: corsHeaders });
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { fullName, email, opgg, isPaid, orderItems } = body;
    console.log("body", body);
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!fullName) {
      return new NextResponse("Full name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("Email is required", { status: 400 });
    }
    if (!opgg) {
      return new NextResponse("OPGG is required", { status: 400 });
    }
    if (!isPaid) {
      return new NextResponse("isPaid is required", { status: 400 });
    }
    if (!orderItems) {
      return new NextResponse("orderItems is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }
    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unothorized", { status: 403 });
    }
    const order = await prismadb.order.create({
      data: {
        fullName,
        email,
        opgg,
        isPaid,
        orderItems,

        storeId: params.storeId,
      },
    });
    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const orders = await prismadb.order.findMany({
      where: {
        storeId: params.storeId,
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.log("[ORDERS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
