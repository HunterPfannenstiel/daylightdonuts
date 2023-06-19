"use client";

import { FunctionComponent } from "react";
import classes from "./CreateExtraModal.module.css";
import Pages from "@_admin-reuse/Pages";
import ExtraDetails from "@_admin-reuse/Modify/Extras/ExtraDetails";

interface CreateExtraModalProps {}

const CreateExtraModal: FunctionComponent<CreateExtraModalProps> = () => {
  const onSubmit = () => {
    console.log("submit!");
  };
  const updateHandler = (key: string, value: string) => {
    console.log(value);
  };
  return (
    <Pages
      pages={[
        <ExtraDetails
          initialDetails={{ name: "", price: "", abbreviation: "" }}
          updateHandler={updateHandler}
        />,
        <h2>Dummy Page</h2>,
      ]}
      submitHandler={onSubmit}
    />
  );
};

export default CreateExtraModal;
