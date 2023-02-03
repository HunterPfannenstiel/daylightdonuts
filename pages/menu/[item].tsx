import { GetStaticPaths, GetStaticProps } from "next/types";
import { getAllItemNames, getItemDetails } from "utils/database/menu";
import { FunctionComponent } from "react";
import { Item } from "@_types/database/menu";
import ItemPage from "components/ui/ItemPage/ItemPage";
import Head from "next/head";

interface ItemProps {
  itemDetails: Item[];
}

const Item: FunctionComponent<ItemProps> = ({ itemDetails }) => {
  return (
    <>
      <Head>
        <title>{`${itemDetails[0].name} - Delicious and Fresh`}</title>
        <meta name="description" content={itemDetails[0].description} />
      </Head>
      <ItemPage item={itemDetails[0]} />
    </>
  );
};

export default Item;

export const getStaticProps: GetStaticProps = async (context) => {
  const item = context.params?.item;
  if (typeof item === "string") {
    const itemDetails = await getItemDetails(item);
    if (itemDetails) {
      return {
        props: {
          itemDetails,
        },
      };
    }
  }

  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type Path = {
    params: { item: string };
  };
  const itemNames = await getAllItemNames();
  const paths: Path[] = [];
  itemNames.forEach((name) => {
    paths.push({ params: { item: name.name } });
  });

  return { paths, fallback: false };
};
