import { FunctionComponent } from "react";
import classes from "./CreateModal.module.css";
import { ModalProps } from "@_hooks/animation/useAnimateModal";
import ModifyMenuModal from "@_admin-reuse/ModifyMenuModal";
import Pages from "@_admin-reuse/Pages";
import ItemGroupingDetails from "@_admin-reuse/Modify/ItemGrouping/ItemGroupingDetails";
import ItemGroupingItems from "@_admin-reuse/Modify/ItemGrouping/ItemGroupingItems";
import useCollectItemGroupingInfo from "@_hooks/admin/menu/item-grouping/useCollectItemGroupingInfo";
import { PostCreateItemGrouping } from "@_utils/database/admin/menu-queries/groupings";
import ModifyMenu from "custom-objects/ModifyMenu";
import { createFormData } from "@_utils/index";
import { AddNewEntity } from "@_hooks/admin/menu/useUpdateEntities";

interface CreateModalProps {
  modalProps: ModalProps;
  addNewGrouping: AddNewEntity;
}

const CreateModal: FunctionComponent<CreateModalProps> = ({
  modalProps,
  addNewGrouping,
}) => {
  const info = useCollectItemGroupingInfo("");
  const onSubmit = async () => {
    const details = {
      name: info.details.name,
      price: info.details.price,
      size: +info.details.size,
      menuItemIds: JSON.stringify(
        ModifyMenu.SelectionsToArray(info.itemSelections)
      ),
      image: info.imageBlob,
    } as PostCreateItemGrouping;
    const formData = createFormData(details);
    const res = await ModifyMenu.Post.Create<number>(
      "item-grouping",
      formData,
      true
    );
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    addNewGrouping({ id: res.data, name: info.details.name });
    modalProps.handleModal();
  };
  return (
    <ModifyMenuModal modalProps={modalProps}>
      <Pages
        pages={[
          <ItemGroupingDetails
            initialDetails={info.details}
            updateDetails={info.updateDetails}
            image={info.imageUrl}
            updateImage={info.updateImage}
          />,
          <ItemGroupingItems
            initialItems={info.itemSelections}
            updateGroupingItem={info.updateItem}
          />,
        ]}
        submitHandler={onSubmit}
      />
    </ModifyMenuModal>
  );
};

export default CreateModal;
