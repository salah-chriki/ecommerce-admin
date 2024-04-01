import paypal from "@paypal/checkout-server-sdk";
import { NextResponse } from "next/server";

const clientId = process.env.PAYPAL_CLIENT_ID || "";
const clientSecret = process.env.PAYPAL_CLIENT_SECRET || "";

const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret);
const client = new paypal.core.PayPalHttpClient(environment);

export async function POST(req: Request) {
  const { items } = await req.json();
  const totalPrice = items
    .reduce((total: any, item: any) => {
      return total + Number(item.unit_amount.value * item.quantity);
    }, 0)
    .toFixed(2);

  const request = new paypal.orders.OrdersCreateRequest();
  request.requestBody({
    purchase_units: [
      {
        items: items,
        amount: {
          currency_code: "EUR",
          value: totalPrice,
          breakdown: {
            item_total: {
              currency_code: "EUR",
              value: totalPrice,
            },
            discount: {
              currency_code: "EUR",
              value: "0.00",
            },
            handling: {
              currency_code: "EUR",
              value: "0.00",
            },
            insurance: {
              currency_code: "EUR",
              value: "0.00",
            },
            shipping_discount: {
              currency_code: "EUR",
              value: "0.00",
            },
            shipping: {
              currency_code: "EUR",
              value: "0.00",
            },
            tax_total: {
              currency_code: "EUR",
              value: "0.00",
            },
          },
        },
      },
    ],
    intent: "CAPTURE",
    application_context: {
      brand_name: "RPSHOP",
      shipping_preference: "NO_SHIPPING",
    },
  });

  const response = await client.execute(request);
  console.log(response);
  return NextResponse.json({ id: response.result.id });
}
