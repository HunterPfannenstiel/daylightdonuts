import { FunctionComponent } from "react";
import classes from "./EntityDispay.module.css";
import { DBEntity } from "@_types/admin/modify-menu";

interface EntityDisplayProps {
  entities: DBEntity[];
  setSelectedEntity: (entity: DBEntity, i: number) => void;
}

const EntityDisplay: FunctionComponent<EntityDisplayProps> = ({
  entities,
  setSelectedEntity,
}) => {
  return (
    <ul>
      {entities.map((entity, i) => {
        return (
          <li key={entity.name}>
            <h2>{entity.name}</h2>
            <button onClick={setSelectedEntity.bind(null, entity, i)}>
              Modify
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default EntityDisplay;
