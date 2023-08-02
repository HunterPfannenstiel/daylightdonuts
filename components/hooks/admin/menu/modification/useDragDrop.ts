import { DBEntity } from "@_types/admin/modify-menu";
import { useState } from "react";

const useDragDrop = <T>(initialItems?: T[]) => {
  const [items, setItems] = useState(initialItems || []);

  const addItem = (item: T) => {
    setItems((prevState) => [...prevState, item]);
  };

  const swapItems = (indexOne: number, indexTwo: number) => {
    setItems((prevState) => {
      const newItems = prevState.map((item) => {
        return { ...item };
      });
      const temp = newItems[indexOne];
      newItems[indexOne] = newItems[indexTwo];
      newItems[indexTwo] = temp;
      return newItems;
    });
  };

  const deleteItem = (index: number, amount: number = 1) => {
    if (index !== -1) {
      setItems((prevState) => {
        const copyState = [...prevState];
        copyState.splice(index, amount);
        return copyState;
      });
    }
  };

  return [items, { swapItems, deleteItem, addItem }] as [
    T[],
    {
      swapItems: (indexOne: number, indexTwo: number) => void;
      deleteItem: (index: number, amount?: number) => void;
      addItem: (item: T) => void;
    }
  ];
};

export default useDragDrop;
