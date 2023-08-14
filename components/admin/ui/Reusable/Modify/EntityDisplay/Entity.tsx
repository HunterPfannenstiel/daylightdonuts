import { FunctionComponent } from "react";
import classes from "./Entity.module.css";
import Button from "@ui/Reusable/Button";

interface EntityProps {
  name: string;
  onClick: () => void;
}

const Entity: FunctionComponent<EntityProps> = ({ name, onClick }) => {
  return (
    <div className={classes.container}>
      <h2 className={classes.name}>{name}</h2>
      <Button onClick={onClick}>Modify</Button>
    </div>
  );
};

export default Entity;
