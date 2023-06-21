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

interface ModalContentsProps {
  extraId: number;
  selections: ExtraSelections;
  name: string;
  categories: DBEntity[];
  groupings: ExtraGroup[];
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  extraId,
  selections,
  name,
  categories,
  groupings,
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
    const {
      name: newName,
      price,
      abbreviation,
      isArchived,
    } = info.extraDetails;
    const newCategoryId = info.selectedCategoryId.current;
    const selectedGroups = info.getExtraGroupInfo();
    const initialGroups = info.getExtraGroupInfo(selections.initial_groups);
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

    const modifications = {
      extraId,
      name: newName === name ? undefined : newName,
      price: price === selections.initial_price ? undefined : price,
      abbreviation:
        abbreviation === selections.initial_abbreviation
          ? undefined
          : abbreviation,
      groupInfo: modifyGroups,
      removeGroupIds: removeGroupIds.map((group) => group.extraGroupId),
      categoryId:
        newCategoryId === selections.initial_category_id
          ? undefined
          : newCategoryId,
      archived:
        isArchived === selections.initital_archive ? undefined : isArchived,
    } as ModifyExtra;

    console.log(modifications);

    const res = await fetch("/api/admin/modify-menu/extra/modify", {
      method: "PATCH",
      body: JSON.stringify(modifications),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
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