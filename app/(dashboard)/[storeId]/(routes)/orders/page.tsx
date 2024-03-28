import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { OrderColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import OrderClient from "./components/client";

const OrdersPage = async ({ params }: { params: { storeId: string } }) => {
  const orders = await prismadb.order.findMany({
    where: { storeId: params.storeId },
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

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    fullName: order.fullName,
    email: order.email,
    opgg: order.opgg,
    products: order.orderItems
      .map((orderItem) => `${orderItem.product.name} (${orderItem.quantity}) `)
      .join(","),
    isPaid: order.isPaid,
    totalPrice: formatter.format(
      order.orderItems.reduce((total, orderItem) => {
        return total + Number(orderItem.product.price) * orderItem.quantity;
      }, 0)
    ),
    createdAt: format(order.createdAt, "MMMM do, yyyy"),
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
};

export default OrdersPage;
