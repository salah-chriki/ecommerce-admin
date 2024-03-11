import getAllStores from "@/lib/getAllStores";
import prismadb from "@/lib/prismadb";
import { Store } from "@prisma/client";

interface DashboardPageProps {
  params: { storeId: string };
}

const DashboardPage: React.FC<DashboardPageProps> = async ({ params }) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId,
    },
  });

  return <div>The store : {store?.name}</div>;
};

export default DashboardPage;
