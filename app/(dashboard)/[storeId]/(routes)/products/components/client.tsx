"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ProductColumn, columns } from "./columns";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

type ProductClientProps = {
  data: ProductColumn[];
};

const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage products in your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable searchKey="name" columns={columns} data={data} />
        <Separator />
        <ApiList entityName="products" entityIdName="productId" />
      </div>
    </>
  );
};

export default ProductClient;
