import { NO_GROUP } from "@_providers/old-cart/utils";
import { CartDozens, CartGroup, Items } from "@_types/database/cart";
import { FunctionComponent } from "react";
import BoxList from "./BoxList";
import classes from "./Group.module.css";

interface GroupProps {
  groupName: string;
  cartGroup: CartGroup;
}

const Group: FunctionComponent<GroupProps> = ({ groupName, cartGroup }) => {
  if (groupName !== NO_GROUP) {
    return (
      <section className={classes.group}>
        <h1>{groupName}</h1>
        <BoxList groupId={groupName} cartGroup={cartGroup} />
      </section>
    );
  } else {
    return <></>;
  }
};

export default Group;
