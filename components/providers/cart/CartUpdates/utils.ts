import { DozenDBItem, DozenUpdate, UpdateItem } from "@_types/database/cart";

export const getInitialContext = () => {
  return {
    modifiedPrice: 0,
    modifiedItems: 0,
    handleItemUpdate: (
      modifyPrice: number,
      modifyItems: number,
      cartItemId: string,
      groupId: string,
      update: UpdateItem
    ) => {},
    handleDozenUpdate: (
      modifyPrice: number,
      modifyItems: number,
      groupId: string,
      update: DozenUpdate,
      dozenItems: DozenDBItem[]
    ) => {},
    handleDozenItemUpdate: (
      modifyPrice: number,
      modifyItems: number,
      groupId: string,
      dozenId: string,
      cartItemId: string,
      update: UpdateItem
    ) => {},
    triggerUpdates: () => {},
    isPendingUpdates: false,
  };
};
