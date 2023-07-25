import { FunctionComponent } from "react";
import classes from "./LocationItem.module.css";
import { Location } from "@_types/database/checkout";
import RowContainer from "components/ui/Reusable/RowContainer";
import Clock from "components/ui/svg/Clock";
import Phone from "components/ui/svg/Phone";

interface LocationItemProps {
  location: Location;
}

const LocationItem: FunctionComponent<LocationItemProps> = ({ location }) => {
  return (
    <li className={classes.container}>
      <p>
        {location.city}, {location.state} {location.zip}
      </p>
      <p>{location.address}</p>
      <RowContainer>
        <Clock />
        <p>5:00 am - Sell out</p>
      </RowContainer>
      <RowContainer>
        <Phone />
        <p>{location.phone_number}</p>
      </RowContainer>
    </li>
  );
};

export default LocationItem;
