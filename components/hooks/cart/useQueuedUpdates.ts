import {
  DozenItemUpdates,
  DozenUpdate,
  DozenUpdates,
  ExistingItemUpdates,
  UpdateItem,
} from "@_types/database/cart";
import {
  addToDozen,
  addToDozenItem,
  addToExisting,
} from "@_utils/database/cart/queuedUpdates";
import { useRef } from "react";

const useQueuedUpdates = () => {
  const existingUpdates = useRef<ExistingItemUpdates>({});
  const dozenUpdates = useRef<DozenUpdates>({});
  const dozenItemUpdates = useRef<DozenItemUpdates>({});

  const updateExisitingUpdates = (groupId: string, update: UpdateItem) => {
    addToExisting(existingUpdates, groupId, update);
  };

  const updateDozenUpdates = (groupId: string, update: DozenUpdate) => {
    addToDozen(dozenUpdates, groupId, update);
  };

  const updateDozenItemUpdates = (
    groupId: string,
    dozenId: string,
    update: UpdateItem
  ) => {
    addToDozenItem(dozenItemUpdates, groupId, dozenId, update);
  };

  const resetUpdates = () => {
    existingUpdates.current = {};
    dozenUpdates.current = {};
    dozenItemUpdates.current = {};
  };

  return {
    updateExisitingUpdates,
    updateDozenUpdates,
    updateDozenItemUpdates,
    resetUpdates,
    existingUpdates: existingUpdates.current,
    dozenUpdates: dozenUpdates.current,
    dozenItemUpdates: dozenItemUpdates.current,
  };
};

export default useQueuedUpdates;
