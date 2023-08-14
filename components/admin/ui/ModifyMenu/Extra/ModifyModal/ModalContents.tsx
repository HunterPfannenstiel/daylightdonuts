import { FormEvent, FunctionComponent } from "react";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";
import {
  DBEntity,
  ExtraSelections,
  NestedDBEntity,
} from "@_types/admin/modify-menu";
import ExtraGroups from "@_admin-reuse/Modify/Extras/ExtraGroups";
import useCollectExtraInfo from "@_hooks/admin/menu/extras/useCollectExtraInfo";
import { ModifyExtra } from "@_utils/database/admin/menu-queries/extras";
import { NestedEntityFunctions } from "@_hooks/admin/menu/useUpdateNestedEntities";
import ModifyMenu from "custom-objects/ModifyMenu";

interface ModalContentsProps {
  extraId: number;
  selections: ExtraSelections;
  name: string;
  categories: DBEntity[];
  groupings: NestedDBEntity[];
  index: number;
  handleModal: () => void;
  modifyEntity: NestedEntityFunctions;
}

const ModalContents: FunctionComponent<ModalContentsProps> = ({
  extraId,
  selections,
  name,
  categories,
  groupings,
  index,
  handleModal,
  modifyEntity,
}) => {
  const info = useCollectExtraInfo(
    {
      name,
      price: selections.initial_price || "",
      abbreviation: selections.initial_abbreviation || "",
      isArchived: selections.initital_archive,
    },
    selections.initial_category_id,
    selections.initial_groups
  );
  const onModify = async (e: FormEvent) => {
    e.preventDefault();
    const {
      name: newName,
      price,
      abbreviation,
      isArchived,
    } = info.getUpdatedDetails();
    const newCategoryId = info.getUpdatedId();
    const selectedGroups = info.getExtraGroupInfo();
    const initialGroups = info.getExtraGroupInfo(selections.initial_groups);
    const { modifiedDisplayOrders, removedIds } =
      ModifyMenu.GetNewAndRemovedDisplayOrders(initialGroups, selectedGroups);

    const modifications = {
      extraId,
      name: newName,
      price: ModifyMenu.CompareVal(selections.initial_price, price),
      abbreviation: ModifyMenu.CompareVal(
        selections.initial_abbreviation,
        abbreviation
      ),
      groupInfo: modifiedDisplayOrders,
      removeGroupIds: removedIds,
      categoryId: newCategoryId,
      archived: ModifyMenu.CompareVal(selections.initital_archive, isArchived),
    } as ModifyExtra;

    const res = await ModifyMenu.Post.Modify("extra", modifications);
    if (!res.success) {
      console.error(res.errorMessage);
      return;
    }
    if (newName) {
      if (!newCategoryId) {
        modifyEntity.updateEntity(
          newName,
          selections.initial_category_id,
          index
        );
      } else {
        modifyEntity.deleteEntity(selections.initial_category_id, index);
        modifyEntity.addNewEntity(
          { id: extraId, name: newName },
          newCategoryId
        );
      }
    } else if (newCategoryId) {
      modifyEntity.deleteEntity(selections.initial_category_id, index);
      modifyEntity.addNewEntity({ id: extraId, name: name }, newCategoryId);
    }
    handleModal();
  };
  return (
    <form onSubmit={onModify}>
      <ExtraDetails {...info.getExtraDetailsProps()} />
      <ExtraGroups
        {...info.getExtraGroupProps()}
        groupSelections={groupings}
        categories={categories}
      />
      <button>Submit Modifications</button>
    </form>
  );
};

export default ModalContents;
