import { NextResponse } from "next/server";
import FormData from "form-data";
import Mailgun from "mailgun.js";

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
  const { name, email, message } = body;
  if (!params.storeId) {
    return new NextResponse("Store id is required", { status: 400 });
  }

  const mailgun = new Mailgun(FormData);
  const mg = mailgun.client({
    username: "api",
    key: process.env.MAILGUN_API_KEY || "key-yourkeyhere",
  });

  mg.messages
    .create("sandbox-123.mailgun.org", {
      from: "Contact Form <mailgun@sandbox-123.mailgun.org>",
      to: ["salahchriki1@gmail.com"],
      subject: "New Contact Form!",
      text: message,
      html: `<h1>Hello</h1>
  
  <p>Name: ${name} his email is ${email}</p>   `,
    })
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.log(err));

  return NextResponse.json({ submitted: true }, { headers: corsHeaders });
}
