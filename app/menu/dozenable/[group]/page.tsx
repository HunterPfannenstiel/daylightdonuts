import { Item } from "@_types/database/menu";
import { DozenableDBResponse } from "@_types/dozenable";
import {
  getAllItemsForGroup,
  getGroupNames,
} from "@_utils/database/dozenable/queries";
import DozenablePage from "components/ui/Dozenable/DozenablePage";
import { Metadata } from "next/types";

export const dynamicParams = false;

export const generateMetadata = async ({
  params,
}: {
  params: { group: string };
}): Promise<Metadata> => {
  const group = await getGroup(params);
  return {
    title: `Create a box of ${group.groupInfo.name}`,
    description: `Easily create a box of donuts from the ${group.groupInfo.name} category to save money on your donuts!`,
  };
};

export const generateStaticParams = async () => {
  const groupNames = await getGroupNames();
  const paths: { group: string }[] = [];
  groupNames.forEach((group) => {
    group = group.replaceAll(" ", "%20");
    paths.push({ group });
  });
  return paths;
};

const getGroup = async (params: { group: string }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DOMAIN}/api/group?name=${params.group}`
  );
  const data = (await res.json()) as {
    groupInfo: DozenableDBResponse;
    items: Item[];
  };
  // const group = await getAllItemsForGroup(params.group);
  return data;
};

const DozenableGroup = async ({ params }: { params: { group: string } }) => {
  const { items, groupInfo } = await getGroup(params);
  return (
    <DozenablePage
      groupName={groupInfo.name}
      items={items}
      boxSize={groupInfo.size}
      boxPrice={groupInfo.price}
    />
  );
};

export default DozenableGroup;
