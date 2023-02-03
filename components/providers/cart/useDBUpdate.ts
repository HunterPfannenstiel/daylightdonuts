import { DBModifier, UpdateDB } from "@_types/database/cart";
import { getInitialUpdates } from "@_utils/database/cart/modifiers/dbModifiers";
import { useRef, useState } from "react";

const reducer = (state: UpdateDB, updateMod: DBModifier) => {
  updateMod(state);
};

const useDBUpdate = () => {
  const updates = useRef<UpdateDB>(getInitialUpdates());
  const [isUpdatePending, setIsUpdatePending] = useState(false);
  const timer = useRef(setTimeout(() => {}));

  const addUpdates = (dbModifier: DBModifier) => {
    setIsUpdatePending(true);
    reducer(updates.current, dbModifier);
  };

  const resetUpdates = () => {
    updates.current = getInitialUpdates();
  };

  return {
    updates: updates.current,
    isUpdatePending,
    setPending: setIsUpdatePending,
    timer,
    addUpdates,
    resetUpdates,
  };
};

export default useDBUpdate;
