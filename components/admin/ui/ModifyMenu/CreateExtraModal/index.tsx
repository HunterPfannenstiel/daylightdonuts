"use client";

import { FunctionComponent, useRef } from "react";
import classes from "./CreateExtraModal.module.css";
import Pages from "@_admin-reuse/Pages";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";
import ExtraGroups from "@_admin-reuse/Modify/Extras/ExtraGroups";
import { DBEntity, ExtraGroup } from "@_types/admin/modify-menu";
import useCollectExtraInfo from "@_hooks/admin/menu/useCollectExtraInfo";
import { CreateExtra } from "@_utils/database/admin/menu-queries/extras";

interface CreateExtraModalProps {
  categories: DBEntity[];
  groupings: ExtraGroup[];
}

const CreateExtraModal: FunctionComponent<CreateExtraModalProps> = ({
  categories,
  groupings,
}) => {
  const info = useCollectExtraInfo();
  const canFlipCurrPage = useRef(true);
  const updatePageFlip = (bool: boolean) => {
    canFlipCurrPage.current = bool;
  };
  const onSubmit = async () => {
    const groupInfo = info.getExtraGroupInfo();
    const { name, price, abbreviation } = info.extraDetails;
    const extraInfo = {
      name,
      price,
      abbreviation,
      groupInfo,
      categoryId: info.selectedCategoryId.current,
    } as CreateExtra;

    const res = await fetch("/api/admin/modify-menu/extra/modify", {
      method: "POST",
      body: JSON.stringify(extraInfo),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("An error occured", data);
    } else {
      console.log("New Extra Id!", data);
    }
  };
  return (
    <Pages
      beforePageTurn={() => canFlipCurrPage.current}
      pages={[
        <ExtraDetails
          initialDetails={info.extraDetails}
          updateHandler={info.updateDetails}
          canFlipPage={updatePageFlip}
        />,
        <ExtraGroups
          initialGroups={info.selectedGroupingIds}
          initialCategoryId={info.selectedCategoryId}
          updateCategory={info.updateCategoryId}
          updateGroupings={info.updateGroup}
          categories={categories}
          groupSelections={groupings}
          canFlipPage={updatePageFlip}
        />,
      ]}
      submitHandler={onSubmit}
    />
  );
};
export default CreateExtraModal;
