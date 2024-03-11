"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellActions from "./cell-actions";

export type OrderColumn = {
  id: string;
  email: String;
  fullName: String;
  opgg: String;
  isPaid: Boolean;
  totalPrice: string;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "fullName",
    header: "Full name",
  },
  {
    accessorKey: "opgg",
    header: "OP/GG",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "products",
    header: "Products",
  },

  {
    accessorKey: "totalPrice",
    header: "Total",
  },

  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    accessorKey: "isPaid",
    header: "Paid",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
