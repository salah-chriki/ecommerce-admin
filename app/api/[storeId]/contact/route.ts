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

    console.log("body", body);
    return NextResponse.json(body);
  } catch (error) {
    console.log("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
