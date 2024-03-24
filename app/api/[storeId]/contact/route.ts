import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!email) {
      return new NextResponse("email is required", { status: 400 });
    }
    if (!message) {
      return new NextResponse("message is required", { status: 400 });
    }

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    return new NextResponse(body.json(), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.log("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
