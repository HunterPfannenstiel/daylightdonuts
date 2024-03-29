import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import useCollectModalInfo from "@_hooks/admin/menu/item/useCollectModalInfo";
import ItemDetails from "../../../Reusable/ModifyMenuItem/ItemDetails";
import ItemGroupings from "../../../Reusable/ModifyMenuItem/ItemGroupings";
import { AvailableExtraGrouping, NewDBItem } from "@_types/admin/forms";
import ItemExtras from "../../../Reusable/ModifyMenuItem/ItemExtras";
import ItemCategories from "../../../Reusable/ModifyMenuItem/ItemCategories";
import ItemAvailability from "../../../Reusable/ModifyMenuItem/ItemAvailability";
import { formatDateRange } from "@_utils/admin/modify-menu";
import { createFormData } from "@_utils/index";
import ModifyMenu from "custom-objects/ModifyMenu";
import Pages from "@_admin-reuse/Pages";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import { AddNewEntity } from "@_hooks/admin/menu/useUpdateEntities";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";

interface CreateItemModalProps {
  groupings: DBEntity[];
  extraGroupings: AvailableExtraGrouping[];
  itemCategories: NestedDBEntity[];
  modalProps: ModalProps;
  addNewItem: AddNewEntity;
}

const CreateItemModal: FunctionComponent<CreateItemModalProps> = ({
  groupings,
  extraGroupings,
  itemCategories,
  modalProps,
  addNewItem,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const itemInfo = useCollectModalInfo();

  const createItem = async () => {
    setIsLoading(true);
    const { name, price, description } = itemInfo.menuItemDetails;
    const groupingId = itemInfo.selectedGroupingId;
    const extraGroups = itemInfo.dbHelpers.getSelectedExtraGroups();
    const { categories, subcategories } =
      itemInfo.dbHelpers.getSelectedCategories();
    const availableWeekdays = itemInfo.dbHelpers.getSelectedWeekdays();
    const { availabilityRange } = itemInfo;
    const { newImages, newImageDisplayOrder } =
      itemInfo.dbHelpers.getImageDetails();
    const dataValues: NewDBItem = {
      name,
      price: +(+price).toFixed(2),
      description,
      groupingId: groupingId.current,
      extraGroups: JSON.stringify(extraGroups),
      categories: JSON.stringify(categories),
      subcategories: JSON.stringify(subcategories),
      availableWeekdays: JSON.stringify(availableWeekdays),
      availabilityRange: formatDateRange(availabilityRange) || undefined,
      newImageDisplayOrder: JSON.stringify(newImageDisplayOrder),
    };
    const formData = createFormData(dataValues, { images: newImages });
    const res = await ModifyMenu.Post.Create<number>("item", formData, true);
    if (!res.success) {
      console.error(res.errorMessage);
      setIsLoading(false);
      return;
    }
    addNewItem({ name, id: res.data });
    setIsLoading(false);
    modalProps.handleModal();
  };

  return (
    <ModifyMenuModal modalProps={modalProps} showSpinner={isLoading}>
      <Pages
        submitHandler={createItem}
        pages={[
          <ItemDetails
            images={itemInfo.itemImages}
            swapImages={itemInfo.swapImages}
            addImages={itemInfo.addImages}
            initialDetails={itemInfo.menuItemDetails}
            updateHandler={itemInfo.updateItemDetails}
            deleteImage={itemInfo.deleteImage}
          />,
          <ItemGroupings
            availableGroupings={groupings}
            groupingSelectHandler={itemInfo.updateGroupingId}
            selectedId={itemInfo.selectedGroupingId.current}
          />,
          <ItemExtras
            groupings={extraGroupings}
            selectedGroupings={itemInfo.selectedExtraGroupings}
            updateSelectedGroupings={itemInfo.updateExtraGroupingIds}
          />,
          <ItemCategories
            itemCategories={itemCategories}
            selectedCategories={itemInfo.selectedItemCategories}
            updateHandler={itemInfo.updateItemCategories}
          />,
          <ItemAvailability
            selectedWeekdays={itemInfo.selectedWeekdays}
            availabilityRange={itemInfo.availabilityRange}
            updateRangeHandler={itemInfo.updateAvailableRange}
            updateWeekdayHandler={itemInfo.updateWeekdayAvailability}
          />,
        ]}
      />
    </ModifyMenuModal>
  );
};
export default CreateItemModal;
