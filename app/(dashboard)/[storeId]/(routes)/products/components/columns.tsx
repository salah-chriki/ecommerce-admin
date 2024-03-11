"use client";

import { ColumnDef } from "@tanstack/react-table";

import CellActions from "./cell-actions";
import Image from "next/image";

export type ProductColumn = {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  isFeatured: boolean;
  isArchived: boolean;
  createdAt: string;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    header: "Image",
    id: "imageUrl",
    cell: ({ row }) => (
      <Image
        src={row.original.imageUrl}
        alt="product image"
        width={50}
        height={40}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
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
