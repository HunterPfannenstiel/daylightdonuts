import { FormEvent, FunctionComponent } from "react";
import classes from "./ModalContents.module.css";
import ExtraCategoryName from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryName";
import ExtraCategoryNewExtras from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryNewExtras";
import ExtraCategoryExistingExtras from "@_admin-reuse/Modify/ExtraCategory/ExtraCategoryExistingExtras";
import useCollectExtraCategoryInfo from "@_hooks/admin/menu/extra-category/useCollectExtraCategoryInfo";
import { DBEntity, ExtraCategorySelections } from "@_types/admin/modify-menu";
import { ModifyExtraCategory } from "@_utils/database/admin/menu-queries/extras";
import ModifyMenu from "custom-objects/ModifyMenu";

interface ModalContentsProps {
  extraCategoryId: number;
  categoryName: string;
  initialInfo: ExtraCategorySelections;
  existingExtras: DBEntity[];
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  extraCategoryId,
  categoryName,
  initialInfo,
  existingExtras,
}) => {
  const info = useCollectExtraCategoryInfo(categoryName, initialInfo);
  const onModify = async (e: FormEvent) => {
    e.preventDefault();
    const selectedIds = ModifyMenu.SelectionsToArray(info.selectedExtraIds);
    const addExtraIds = selectedIds.filter((id) => {
      return !initialInfo.initial_extras[id];
    });
    const details = {
      extraCategoryId,
      name: ModifyMenu.CompareVal(categoryName, info.name.current),
      newExtras: ModifyMenu.CheckArrayLen(info.newExtras),
      addExtraIds: ModifyMenu.CheckArrayLen(addExtraIds),
    } as ModifyExtraCategory;
    await ModifyMenu.Post.Modify("extra-category", details);
  };
  return (
    <form onSubmit={onModify}>
      <ExtraCategoryName updateName={info.updateName} initialName={info.name} />
      <ExtraCategoryNewExtras
        initialExtraDetails={info.currentNewExtra}
        updateExtraDetails={info.updateNewExtra}
        addCurrentNewExtra={info.addCurrentNewExtra}
        removeNewExtra={info.removeNewExtra}
        extras={info.newExtras}
        replaceCurrentNewExtra={info.replaceCurrentNewExtra}
      />
      <ExtraCategoryExistingExtras
        extras={existingExtras}
        onExtraSelected={info.updateSelectedExtra}
        initialExtraIds={info.selectedExtraIds}
        selectedExtras={info.selectedExtras}
      />
      <button>Submit</button>
    </form>
  );
};

export default ModalContents;
