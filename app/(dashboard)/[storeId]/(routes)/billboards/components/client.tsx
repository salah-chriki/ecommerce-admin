"use client";

import { Button } from "@/components/ui/button";
import Heading from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { BillboardColumn, columns } from "./columns";

import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";
import ApiList from "@/components/ui/api-list";
import { DataTable } from "@/components/ui/data-table";

type BillboardClientProps = {
  data: BillboardColumn[];
};

const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const params = useParams();
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboards (${data.length})`}
          description="Manage billboard for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="mr-2 w-4 h-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <div>
        <DataTable searchKey="label" columns={columns} data={data} />
        <Separator />
        <ApiList entityName="billboards" entityIdName="billboardId" />
      </div>
    </>
  );
};

export default BillboardClient;
