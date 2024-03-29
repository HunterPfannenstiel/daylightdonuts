import {
  DBEntity,
  ExtraCategoryExtra,
  ExtraCategorySelections,
  ExtraDetails,
} from "@_types/admin/modify-menu";
import { useRef, useState } from "react";
import useSelections, {
  InitialSelections,
} from "../modification/useSelections";

const useCollectExtraCategoryInfo = (
  categoryName: string,
  initialInfo?: ExtraCategorySelections
) => {
  const name = useRef(categoryName);

  const updateName = (newName: string) => {
    name.current = newName;
  };

  const [extraIds, { delete: deleteExtraId, update: updateExtraId }] =
    useSelections(getInitialExtraIds(initialInfo?.initial_extras));

  const [selectedExtras, setSelectedExtras] = useState<DBEntity[]>(
    getInitialDetailedExtras(initialInfo?.initial_extras)
  );

  const updateSelectedExtra = (id: number, name: string) => {
    console.log(id, name);
    if (extraIds[id]) {
      deleteExtraId(id);
      setSelectedExtras((prevState) => {
        const copy = prevState.map((extra) => {
          return { ...extra };
        });
        copy.splice(
          copy.findIndex((extra) => extra.id === id),
          1
        );
        return copy;
      });
    } else {
      updateExtraId(id, true);
      setSelectedExtras((prevState) => {
        const copy = prevState.map((extra) => {
          return { ...extra };
        });
        copy.push({ id, name });
        return copy;
      });
    }
  };

  const [currentNewExtra, setCurrentNewExtra] = useState(getInitialNewExtra());

  const replaceCurrentNewExtra = (index: number) => {
    setCurrentNewExtra(newExtras[index]);
    removeNewExtra(index);
  };

  const updateNewExtra = (key: keyof ExtraDetails, value: string) => {
    setCurrentNewExtra((prevState) => {
      return { ...prevState, [key]: value };
    });
  };

  const addCurrentNewExtra = () => {
    setNewExtras((prevState) => {
      const copy = prevState.map((extra) => {
        return { ...extra, price: extra.price };
      });
      copy.push({
        ...currentNewExtra,
        price: currentNewExtra.price || undefined,
      });
      return copy;
    });
    setCurrentNewExtra(getInitialNewExtra());
  };

  const [newExtras, setNewExtras] = useState<ExtraDetails[]>([]);

  const removeNewExtra = (index: number) => {
    setNewExtras((prevState) => {
      const copy = prevState.map((extra) => {
        return { ...extra };
      });
      copy.splice(index, 1);
      return copy;
    });
  };

  return {
    name,
    updateName,
    selectedExtraIds: extraIds,
    updateSelectedExtra,
    selectedExtras,
    currentNewExtra,
    updateNewExtra,
    addCurrentNewExtra,
    newExtras,
    removeNewExtra,
    replaceCurrentNewExtra,
  };
};

const getInitialExtraIds = (extras?: ExtraCategoryExtra) => {
  if (!extras) return {};
  const selections: InitialSelections = {};
  Object.keys(extras).map((key) => {
    selections[+key] = true;
  });
  return selections;
};

const getInitialDetailedExtras = (items?: ExtraCategoryExtra): DBEntity[] => {
  if (!items) return [];
  return Object.keys(items).map((key) => {
    return { id: +key, name: items[+key] };
  });
};

const getInitialNewExtra = (): ExtraDetails => {
  return { name: "", price: "", abbreviation: "" };
};

export default useCollectExtraCategoryInfo;
