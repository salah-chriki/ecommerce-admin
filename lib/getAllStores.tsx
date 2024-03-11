import prismadb from "./prismadb";

export default async function getAllStores() {
  const res = await prismadb.store.findMany();
  if (!res) throw new Error("not fetched");
  return res;
}
