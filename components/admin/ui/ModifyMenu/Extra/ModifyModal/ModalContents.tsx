import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";
import {
  DBEntity,
  ExtraDetails as ExtraDetailsT,
  ExtraGroup,
  ExtraSelections,
} from "@_types/admin/modify-menu";
import ExtraGroups from "@_admin-reuse/Modify/Extras/ExtraGroups";
import useCollectExtraInfo from "@_hooks/admin/menu/extras/useCollectExtraInfo";
import { ModifyExtra } from "@_utils/database/admin/menu-queries/extras";
import {
  AddNewNestedEntity,
  DeleteNestedEntity,
  UpdateNestedEntity,
} from "@_hooks/admin/menu/useUpdateNestedEntities";
import ModifyMenu from "custom-objects/ModifyMenu";
import { ModalProps } from "@_hooks/animation/useAnimateModal";

interface ModalContentsProps {
  extraId: number;
  selections: ExtraSelections;
  name: string;
  categories: DBEntity[];
  groupings: ExtraGroup[];
  index: number;
  handleModal: () => void;
  updateExtra: UpdateNestedEntity;
  addExtra: AddNewNestedEntity;
  deleteExtra: DeleteNestedEntity;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  extraId,
  selections,
  name,
  categories,
  groupings,
  index,
  handleModal,
  updateExtra,
  addExtra,
  deleteExtra,
}) => {
  const info = useCollectExtraInfo(
    {
      name,
      price: selections.initial_price || "",
      abbreviation: selections.initial_abbreviation || "",
      isArchived: selections.initital_archive,
    },
    selections.initial_category_id,
    { ...selections.initial_groups }
  );
  const onModify = async (e: FormEvent) => {
    e.preventDefault();
    const { price, abbreviation, isArchived } = info.extraDetails;
    const newCategoryId = ModifyMenu.CompareVal(
      selections.initial_category_id,
      info.selectedCategoryId.current
    );
    const selectedGroups = info.getExtraGroupInfo();
    console.log(selectedGroups);
    const initialGroups = info.getExtraGroupInfo(selections.initial_groups);
    console.log(initialGroups);
    const removeGroupIds = initialGroups.filter((group) => {
      for (let i = 0; i < selectedGroups.length; i++) {
        if (selectedGroups[i].extraGroupId === group.extraGroupId) return false;
      }
      return true;
    });
    const modifyGroups = selectedGroups.filter((group) => {
      for (let i = 0; i < initialGroups.length; i++) {
        const initGroup = initialGroups[i];
        if (initGroup.extraGroupId === group.extraGroupId) {
          if (
            initGroup.displayOrder !== group.displayOrder &&
            initGroup.displayOrder !== undefined &&
            group.displayOrder !== null
          ) {
            return true;
          }
          return false;
        }
      }
      return true;
    });
    const newName = ModifyMenu.CompareVal(name, info.extraDetails.name);
    const modifications = {
      extraId,
      name: newName,
      price: ModifyMenu.CompareVal(selections.initial_price, price),
      abbreviation: ModifyMenu.CompareVal(
        selections.initial_abbreviation,
        abbreviation
      ),
      groupInfo: modifyGroups,
      removeGroupIds: removeGroupIds.map((group) => group.extraGroupId),
      categoryId: newCategoryId,
      archived: ModifyMenu.CompareVal(selections.initital_archive, isArchived),
    } as ModifyExtra;

    console.log(modifications);
    const res = await ModifyMenu.Post.Modify("extra", modifications);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (newName) {
      if (!newCategoryId) {
        updateExtra(newName, selections.initial_category_id, index);
      } else {
        deleteExtra(selections.initial_category_id, index);
        addExtra({ id: extraId, name: newName }, newCategoryId);
      }
    } else if (newCategoryId) {
      deleteExtra(selections.initial_category_id, index);
      addExtra({ id: extraId, name: name }, newCategoryId);
    }
    handleModal();
  };
  return (
    <form onSubmit={onModify}>
      <ExtraDetails
        initialDetails={info.extraDetails}
        updateHandler={info.updateDetails}
        canFlipPage={() => {}}
      />
      <ExtraGroups
        initialGroups={info.selectedGroupingIds}
        initialCategoryId={info.selectedCategoryId}
        groupSelections={groupings}
        categories={categories}
        updateCategory={info.updateCategoryId}
        updateGroupings={info.updateGroup}
        canFlipPage={() => {}}
      />
      <button>Submit Modifications</button>
    </form>
  );
};

export default ModalContents;
