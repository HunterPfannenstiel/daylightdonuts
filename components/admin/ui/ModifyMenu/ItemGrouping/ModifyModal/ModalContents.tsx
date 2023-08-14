import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import ItemGroupingDetails from "@_admin-reuse/Modify/ItemGrouping/ItemGroupingDetails";
import ItemGroupingItems from "@_admin-reuse/Modify/ItemGrouping/ItemGroupingItems";
import useCollectItemGroupingInfo, {
  ItemGroupingDetails as IGD,
} from "@_hooks/admin/menu/item-grouping/useCollectItemGroupingInfo";
import { ItemImage } from "@_types/admin/forms";
import { GroupingSelections } from "@_types/admin/modify-menu";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import { UpdateEntity } from "@_hooks/admin/menu/useUpdateEntities";
import { PostModifyItemGrouping } from "@_utils/database/admin/menu-queries/groupings";
import ModifyMenu from "custom-objects/ModifyMenu";
import { createFormData } from "@_utils/index";

interface ModalContentsProps {
  groupingId: number;
  groupingName: string;
  selections: GroupingSelections;
  handleModal: () => void;
  index: number;
  updateGrouping: UpdateEntity;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  groupingId,
  groupingName,
  selections,
  handleModal,
  index,
  updateGrouping,
}) => {
  const info = useCollectItemGroupingInfo(groupingName, selections);
  const onModify = async (e: FormEvent) => {
    e.preventDefault();
    const newName = ModifyMenu.CompareVal(groupingName, info.details.name);
    const { newIds, removedIds } = ModifyMenu.SelectionsToNewAndRemoved(
      selections.items,
      info.itemSelections
    );
    const details = {
      groupingId,
      name: newName,
      price: ModifyMenu.CompareVal(selections.price, info.details.price),
      size: ModifyMenu.CompareVal(
        selections.size.toString(),
        info.details.size
      ),
      image: info.imageBlob,
      addItemIds: JSON.stringify(newIds),
      removeItemIds: JSON.stringify(removedIds),
    } as PostModifyItemGrouping;
    const formData = createFormData(details);
    const res = await ModifyMenu.Post.Modify("item-grouping", formData, true);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (newName) {
      updateGrouping(newName, index);
    }
    handleModal();
  };
  return (
    <form onSubmit={onModify}>
      <ItemGroupingDetails
        initialDetails={info.details}
        updateDetails={info.updateDetails}
        image={info.imageUrl}
        updateImage={info.updateImage}
      />
      <ItemGroupingItems
        initialItems={info.itemSelections}
        updateGroupingItem={info.updateItem}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ModalContents;
