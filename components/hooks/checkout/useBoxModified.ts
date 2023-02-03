import { useEffect, useState } from "react";

const useBoxModified = (isPendingUpdates: boolean) => {
  const [modifications, setModifications] = useState<{ [p: string]: number }>(
    {}
  );
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    const isModification = Object.keys(modifications).find(
      (key) => modifications[key] > 0
    );

    setIsModified(!!isModification);
  }, [modifications]);
  useEffect(() => {
    if (!isPendingUpdates) {
      setModifications({});
    }
  }, [isPendingUpdates]);
  const updateModifications = (id: string, amount: number) => {
    setModifications((prevState) => {
      if (!prevState[id]) {
        return { ...prevState, [id]: amount };
      } else {
        return { ...prevState, [id]: prevState[id] + amount };
      }
    });
  };

  return {
    isModified,
    updateModifications,
  };
};

export default useBoxModified;
