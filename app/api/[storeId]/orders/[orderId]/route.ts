import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    if (!params.orderId) {
      return new NextResponse("order id is required", { status: 400 });
    }

    const order = await prismadb.order.findUnique({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
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

    const storeByUseId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUseId) {
      return new NextResponse("Unothorized", { status: 401 });
    }
    const order = await prismadb.order.update({
      where: {
        id: params.orderId,
        storeId: params.storeId,
      },
      data: {
        fullName,
        email,
        opgg,
        isPaid,
        orderItems: {
          // Update order items
          upsert: orderItems.map((item: any) => ({
            where: { id: item.id }, // Use id to identify existing items
            create: {
              // Create new items if they don't exist
              productId: item.productId,
              quantity: item.quantity,
            },
            update: {
              // Update existing items
              productId: item.productId,
              quantity: item.quantity,
            },
          })),
        },
      },

      include: {
        orderItems: true, // Include updated order items in the response
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; orderId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.orderId) {
      return new NextResponse("orderId is required", { status: 400 });
    }
    const storeByUseId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUseId) {
      return new NextResponse("Unothorized", { status: 401 });
    }
    const order = await prismadb.order.deleteMany({
      where: {
        id: params.orderId,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.log("[ORDER_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
