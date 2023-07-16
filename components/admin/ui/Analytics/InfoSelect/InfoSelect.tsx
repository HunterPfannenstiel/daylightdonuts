import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { useAnalyticsInfo } from "@_providers/Analytics/AnalyticsInfo";
import { IntervalButton, Interval } from "@_types/admin/orders";
import Button from "components/ui/Reusable/Button";
import { FunctionComponent } from "react";
import DateSelect from "../../Reusable/DateSelect/DateSelect";
import GraphDataSelect from "./GraphDataSelect";
import classes from "./InfoSelect.module.css";
import ModalDisplay from "components/ui/Reusable/Modal/ModalDisplay";

interface InfoSelectProps {}

const InfoSelect: FunctionComponent<InfoSelectProps> = () => {
  const { setPickerRange, setInterval } = useAnalyticsInfo();
  const { handleModal, getModalProps } = useAnimateModal(300);
  return (
    <>
      <div className={classes.selectors}>
        <GraphDataSelect />
        <div className={classes.button}>
          <Button color={"var(--primary-blue)"} onClick={handleModal}>
            Set Interval
          </Button>
        </div>
      </div>
      <ModalDisplay {...getModalProps()}>
        <DateSelect
          relativeButtons={relativeButtons}
          relativeIntervalChange={setInterval}
          absoluteIntervalChange={setPickerRange}
        />
      </ModalDisplay>
    </>
  );
};

const relativeButtons: IntervalButton<Interval>[] = [
  {
    label: "Today",
    onClick: (intervalChange) => {
      intervalChange("Day");
    },
  },
  {
    label: "This Week",
    onClick: (intervalChange) => {
      intervalChange("Week");
    },
  },
  {
    label: "This Month",
    onClick: (intervalChange) => {
      intervalChange("Month");
    },
  },
  {
    label: "This Year",
    onClick: (intervalChange) => {
      intervalChange("Year");
    },
  },
];

export default InfoSelect;
