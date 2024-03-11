import prismadb from "@/lib/prismadb";
import CategoryForm from "./components/category-form";

const CategoryPage = async ({ params }: { params: { categoryId: string } }) => {
  const categories = await prismadb.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });
  const billboards = await prismadb.billboard.findMany();

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={categories} billboardsData={billboards} />
      </div>
    </div>
  );
};

export default CategoryPage;

// i want to nextjs Incremental Static Regeneration (ISR) to be used here
