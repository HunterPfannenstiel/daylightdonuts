import { useState } from "react";
import { Range } from "react-date-range";

const useRangeSelect = (initialRange?: Range) => {
  const [selectionRange, setSelectionRange] = useState<Range>(
    initialRange || getTodaysRange
  );

  const updateSelectionRange = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    setSelectionRange({ startDate, endDate });
  };

  return [selectionRange, updateSelectionRange] as [
    Range,
    (startDate: Date | undefined, endDate: Date | undefined) => void
  ];
};

const getTodaysRange = () => {
  return {
    startDate: new Date(),
    endDate: new Date(),
  };
};

export default useRangeSelect;
