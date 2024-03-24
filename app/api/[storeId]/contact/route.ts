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
  const body = await req.json();
  if (!params.storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const mailjet = require("node-mailjet").connect(
    process.env.MJ_APIKEY_PUBLIC,
    process.env.MJ_APIKEY_PRIVATE
  );
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: body.email,
          Name: body.name,
        },
        To: [
          {
            Email: "salahchriki1@gmail.com",
            Name: "Salah Chriki",
          },
        ],
        Subject: "New Contact Form!",
        TextPart: body.message,
        HTMLPart:
          '<h3>Dear passenger 1, welcome to <a href="https://www.mailjet.com/">Mailjet</a>!</h3><br />May the delivery force be with you!',
      },
    ],
  });
  request
    .then((result: Request) => {
      console.log(result.body);
    })
    .catch((err: Error) => {
      console.log(err.message);
    });

  return NextResponse.json(body, { status: 200, headers: corsHeaders });
}
