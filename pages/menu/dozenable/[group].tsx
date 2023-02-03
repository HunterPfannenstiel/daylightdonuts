import { moneyToNum } from "@_providers/cart/utils";
import { Item } from "@_types/database/menu";
import {
  getAllItemsForGroup,
  getGroupNames,
} from "@_utils/database/dozenable/queries";
import DozenablePage from "components/ui/Dozenable/DozenablePage";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next/types";
import { FunctionComponent } from "react";

interface DozenableGroupProps {
  groupName: string;
  groupItems: Item[];
  groupSize: number;
  groupPrice: number;
}

const DozenableGroup: FunctionComponent<DozenableGroupProps> = ({
  groupName,
  groupItems,
  groupSize,
  groupPrice,
}) => {
  return (
    <>
      <Head>
        <title>{`Create a box of ${groupName}`}</title>
        <meta
          name="description"
          content={`Easily create a box of donuts from the ${groupName} category to save money on your donuts!`}
        />
      </Head>
      <DozenablePage
        groupName={groupName}
        items={groupItems}
        boxSize={groupSize}
        boxPrice={groupPrice}
      />
    </>
  );
};

export const getStaticProps: GetStaticProps<DozenableGroupProps> = async (
  context
) => {
  const groupName = context.params?.group;
  if (typeof groupName === "string") {
    const group = await getAllItemsForGroup(groupName);
    return {
      props: {
        groupItems: group.items,
        groupName: group.groupInfo.name,
        groupSize: group.groupInfo.size,
        groupPrice: moneyToNum(group.groupInfo.price),
      },
    };
  }
  return {
    notFound: true,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  type Path = {
    params: { group: string };
  };
  const paths: Path[] = [];
  const groupNames = await getGroupNames();
  groupNames.forEach((group) => {
    paths.push({ params: { group } });
  });

  return { paths, fallback: false };
};

export default DozenableGroup;
