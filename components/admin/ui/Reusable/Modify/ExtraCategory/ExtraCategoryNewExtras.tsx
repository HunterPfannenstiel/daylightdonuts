import { FunctionComponent } from "react";
import classes from "./ExtraCategoryNewExtras.module.css";
import ExtraDetails from "../Extras/ExtraDetails";
import { ExtraDetails as ExtraDetailsT } from "@_types/admin/modify-menu";

interface ExtraCategoryNewExtrasProps {
  initialExtraDetails: ExtraDetailsT;
  updateExtraDetails: (key: keyof ExtraDetailsT, value: string) => void;
  addCurrentNewExtra: () => void;
  extras: ExtraDetailsT[];
  removeNewExtra: (index: number) => void;
  replaceCurrentNewExtra: (index: number) => void;
}

const ExtraCategoryNewExtras: FunctionComponent<
  ExtraCategoryNewExtrasProps
> = ({
  initialExtraDetails,
  addCurrentNewExtra,
  updateExtraDetails,
  extras,
  removeNewExtra,
  replaceCurrentNewExtra,
}) => {
  return (
    <div>
      <div>
        <ExtraDetails
          initialDetails={initialExtraDetails}
          updateHandler={updateExtraDetails}
          canFlipPage={() => {}}
        />
        <button onClick={addCurrentNewExtra}>Create Extra</button>
      </div>
      {extras.length !== 0 && (
        <>
          <p>Newly Created Extras</p>
          <ul className={classes.extra_list}>
            {extras.map((extra, i) => {
              return (
                <li key={extra.name}>
                  <p onClick={removeNewExtra.bind(null, i)}>X</p>
                  <div
                    className={classes.extra_item}
                    onClick={replaceCurrentNewExtra.bind(null, i)}
                  >
                    <p>{extra.name}</p>
                    {extra.price && <p>{`($${extra.price})`}</p>}
                    {extra.abbreviation && <p>{`(${extra.abbreviation})`}</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
};

export default ExtraCategoryNewExtras;
