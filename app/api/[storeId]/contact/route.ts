import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

type ResponseData = {
  name: string;
  email: string;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = req.body();
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

    res.status(200).json(body);
  } catch (error) {
    console.log("[CONTACT_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
