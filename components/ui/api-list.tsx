"use client";

import { ApiAlert } from "@/components/ui/api-alert";
import Heading from "@/components/ui/heading";
import { useOrigin } from "@/hooks/use-origin";
import { Separator } from "@radix-ui/react-separator";
import { useParams } from "next/navigation";

type ApiListProps = {
  entityName: string;
  entityIdName: string;
};

const ApiList: React.FC<ApiListProps> = ({ entityName, entityIdName }) => {
  const origin = useOrigin();
  const params = useParams();

  const baseUrl = `${origin}/api/${params.storeId}`;
  return (
    <div className="mt-3">
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${baseUrl}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </div>
  );
};

export default ApiList;
