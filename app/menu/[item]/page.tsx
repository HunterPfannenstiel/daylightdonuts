import { Item as ItemT } from "@_types/database/menu";
import { getAllItemNames, getItemDetails } from "@_utils/database/menu";
import ItemPage from "components/ui/ItemPage/ItemPage";
import { Metadata } from "next";

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: { item: string };
}): Promise<Metadata> => {
  const item = await getItem(params);
  return {
    title: `${item?.name} - Delicious and Fresh`,
    description: item?.description,
    icons: {
      icon: item?.image_urls[0],
    },
  };
};

const Item = async ({ params }: { params: { item: string } }) => {
  const itemDetails = await getItem(params);
  if (itemDetails) {
    return <ItemPage item={itemDetails} />;
  }
  return <></>;
};

const getItem = async (params: { item: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/item?item=${params.item}`
  );
  const data = (await res.json()) as ItemT | undefined;
  // const itemDetails = await getItemDetails(params.item);
  return data;
};

export const generateStaticParams = async () => {
  const itemNames = await getAllItemNames();
  const params: { item: string }[] = [];
  itemNames.forEach((name) => {
    params.push({ item: name.name });
  });

  return params;
};

export default Item;
