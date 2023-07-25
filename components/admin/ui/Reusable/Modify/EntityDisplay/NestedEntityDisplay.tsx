import { FunctionComponent } from "react";
import classes from "./NestedEntityDisplay.module.css";
import { DBEntity, NestedDBEntity } from "@_types/admin/modify-menu";

interface NestedEntityDisplayProps {
  entities: NestedDBEntity[];
  setSelectedEntity: (entity: DBEntity, i: number) => void;
}

const NestedEntityDisplay: FunctionComponent<NestedEntityDisplayProps> = ({
  entities,
  setSelectedEntity,
}) => {
  return (
    <ul>
      {entities.map(({ name, entities }) => {
        return (
          <li key={name}>
            <h2>{name}</h2>
            {entities.map((entity, i) => {
              return (
                <li onClick={setSelectedEntity.bind(null, entity, i)}>
                  {entity.name}
                </li>
              );
            })}
          </li>
        );
      })}
    </ul>
  );
};

export default NestedEntityDisplay;
