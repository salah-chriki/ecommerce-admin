"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import { CategoryColumn, columns } from "./columns";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

export type CategoryClientProps = {
  data: CategoryColumn[];
};

const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Categories (${data.length})`}
          description="Manage categories of your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable searchKey="name" columns={columns} data={data} />
        <Separator />
        <ApiList entityName="categories" entityIdName="categoryId" />
      </div>
    </>
  );
};

export default CategoryClient;
