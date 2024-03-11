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
  return (
    <div className="mt-3">
      <Heading title="API" description="API calls for products" />
      <Separator />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/${entityName}`}
        variant="public"
      />
      <ApiAlert
        title="GET"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityIdName}}`}
        variant="public"
      />
      <ApiAlert
        title="POST"
        description={`${origin}/api/stores/${params.storeId}/${entityName}`}
        variant="admin"
      />
      <ApiAlert
        title="PATCH"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
      <ApiAlert
        title="DELETE"
        description={`${origin}/api/stores/${params.storeId}/${entityName}/{${entityIdName}}`}
        variant="admin"
      />
    </div>
  );
};

export default ApiList;
