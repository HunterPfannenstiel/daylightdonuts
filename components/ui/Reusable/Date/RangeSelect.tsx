import { FunctionComponent } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import {
  DateRange,
  DateRangeProps,
  Range,
  RangeKeyDict,
} from "react-date-range";
import useRangeSelect from "./useRangeSelect";

interface RangeSelectProps extends DateRangeProps {
  dateHandler?: (start: Date | undefined, end: Date | undefined) => void;
  range?: Range;
}

const RangeSelect: FunctionComponent<RangeSelectProps> = ({
  dateHandler,
  rangeColors = ["#003472"],
  onChange,
  range,
  ranges,
  ...restProps
}) => {
  const [selectionRange, setSelectionRange] = useRangeSelect();
  const dateSelectHandler = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.range1;
    if (!range) setSelectionRange(startDate, endDate);
    if (dateHandler) dateHandler(startDate, endDate);
  };
  let dateRange: Range[] | undefined;
  if (range?.startDate || range?.endDate) dateRange = [range];
  else if (selectionRange.startDate || selectionRange.endDate) {
    dateRange = [selectionRange];
  }
  return (
    <DateRange
      ranges={dateRange}
      onChange={dateSelectHandler}
      rangeColors={rangeColors}
      {...restProps}
    />
  );
};

export default RangeSelect;
