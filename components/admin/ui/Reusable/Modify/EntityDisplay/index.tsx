import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { DBEntity } from "@_types/admin/modify-menu";
import Entity from "./Entity";
import Button from "@ui/Reusable/Button";

interface EntityDisplayProps {
  entities: DBEntity[];
  entityCategory: string;
  setSelectedEntity: (entity: DBEntity, i: number) => void;
  createNewHandler: () => void;
}

const EntityDisplay: FunctionComponent<EntityDisplayProps> = ({
  entities,
  entityCategory,
  setSelectedEntity,
  createNewHandler,
}) => {
  return (
    <div>
      <Button className={classes.button} onClick={createNewHandler}>
        Create New {entityCategory}
      </Button>
      <ul className={classes.content}>
        {entities.map((entity, i) => {
          return (
            <li key={entity.name}>
              <Entity
                name={entity.name}
                onClick={setSelectedEntity.bind(null, entity, i)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EntityDisplay;
