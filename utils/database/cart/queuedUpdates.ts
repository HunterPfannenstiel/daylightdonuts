import {
  DozenItemUpdates,
  DozenUpdate,
  DozenUpdates,
  ExistingItemUpdates,
  UpdateItem,
} from "@_types/database/cart";

export const addToExisting = (
  existing: { current: ExistingItemUpdates },
  groupId: string,
  update: UpdateItem
) => {
  const index = existing.current[groupId]?.findIndex(
    (item) => item.itemId === update.itemId
  );
  if (index === undefined) {
    existing.current[groupId] = [];
    existing.current[groupId].push(update);
  } else if (index === -1) {
    existing.current[groupId].push(update);
  } else {
    existing.current[groupId][index].amount += update.amount;
  }
};

export const addToDozen = (
  dozenUpdates: { current: DozenUpdates },
  groupId: string,
  update: DozenUpdate
) => {
  const updates = dozenUpdates.current[groupId];
  if (updates) {
    updates.amount += update.amount;
  } else {
    dozenUpdates.current[groupId] = update;
  }
};

export const addToDozenItem = (
  dozenItemUpdates: { current: DozenItemUpdates },
  groupId: string,
  dozenId: string,
  update: UpdateItem
) => {
  const groupUpdate = dozenItemUpdates.current[groupId];
  if (groupUpdate) {
    let dozenUpdate = groupUpdate[dozenId];
    if (dozenUpdate) {
      const index = dozenUpdate.findIndex(
        (item) => item.itemId === update.itemId
      );
      if (index === -1) {
        dozenUpdate.push(update);
      } else {
        dozenUpdate[index].amount += update.amount;
      }
    } else {
      groupUpdate[dozenId] = [update];
    }
  } else {
    dozenItemUpdates.current[groupId] = { [dozenId]: [update] };
  }
};
