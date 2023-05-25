import { FunctionComponent, useState } from "react";
import classes from "./CreateItemModal.module.css";
import useCollectModalInfo from "@_hooks/admin/menu/useCollectModalInfo";
import ItemDetails from "../../Reusable/ModifyMenuItem/ItemDetails";
import ItemGroupings from "../../Reusable/ModifyMenuItem/ItemGroupings";
import { Grouping } from "@_types/admin/forms";

interface CreateItemModalProps {
  groupings: Grouping[];
}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = ({
  groupings,
}) => {
  const {
    menuItemDetails,
    updateItemDetails,
    selectedGroupingId,
    updateGroupingId,
  } = useCollectModalInfo();
  const [pageNum, setPageNum] = useState(0);
  const flipPage = (amount: number) => {
    setPageNum((prevState) => prevState + amount);
  };

  return (
    <form>
      {pageNum === 0 && (
        <ItemDetails
          initialDetails={menuItemDetails.current}
          updateHandler={updateItemDetails}
        />
      )}
      {pageNum === 1 && (
        <ItemGroupings
          availableGroupings={groupings}
          groupingSelectHandler={updateGroupingId}
          selectedId={selectedGroupingId.current}
        />
      )}
      {pageNum !== 0 && (
        <button onClick={flipPage.bind(null, -1)}>{"<"}</button>
      )}
      {pageNum !== 1 && <button onClick={flipPage.bind(null, 1)}>{">"}</button>}
    </form>
  );
};

export default CreateItemModal;
