import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("[CATEGORY_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("name is required", { status: 400 });
    }
    if (!billboardId) {
      return new NextResponse("billboardId is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
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
    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId,
        storeId: params.storeId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unothorized", { status: 401 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    if (!params.categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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
    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
