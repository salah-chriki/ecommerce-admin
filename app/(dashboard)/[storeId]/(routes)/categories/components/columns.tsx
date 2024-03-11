"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellActions from "./cell-actions";
import { Billboard } from "@prisma/client";

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  billboardLabel: string;
};

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellActions data={row.original} />,
  },
];
