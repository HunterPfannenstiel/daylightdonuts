import { Item as ItemT } from "@_types/database/menu";
import { getAllItemNames } from "@_utils/database/menu";
import ItemPage from "components/ui/ItemPage/ItemPage";
import { Metadata } from "next";

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: { item: string };
}): Promise<Metadata> => {
  const item = await getItems(params);
  return {
    title: `${item?.name} - Delicious and Fresh`,
    description: item?.description,
    icons: {
      icon: item?.image,
    },
  };
};

export const generateStaticParams = async () => {
  const itemNames = await getAllItemNames();
  const params: { item: string }[] = [];
  itemNames.forEach((name) => {
    params.push({ item: name.name });
  });

  return params;
};

const getItems = async (params: { item: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/item?item=${params.item}`
  );
  const data = (await res.json()) as ItemT | undefined;
  return data;
};
const Item = async ({ params }: { params: { item: string } }) => {
  const itemDetails = await getItems(params);
  if (itemDetails) {
    return <ItemPage item={itemDetails} />;
  }
  return <></>;
};

export default Item;
