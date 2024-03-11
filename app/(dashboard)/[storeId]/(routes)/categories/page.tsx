import prismadb from "@/lib/prismadb";
import { format } from "date-fns";
import { CategoryColumn } from "./components/columns";
import CategoryClient from "./components/client";

const CategoriesPage = async ({ params }: { params: { storeId: string } }) => {
  const categories = await prismadb.category.findMany({
    where: { storeId: params.storeId },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formatteddata: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    createdAt: format(category.createdAt, "MMMM do, yyyy"),
    billboardLabel: category.billboard.label,
  }));
  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryClient data={formatteddata} />
      </div>
    </div>
  );
};

export default CategoriesPage;
