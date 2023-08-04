import { FunctionComponent } from 'react';
import classes from './index.module.css';
import Heading from 'components/ui/Reusable/Heading';
import { Location } from '@_types/database/checkout';
import ScrollList from 'components/ui/Reusable/ScrollList';
import LocationItem from './LocationItem';

interface LocationsProps {
	locations: Location[];
}

const Locations: FunctionComponent<LocationsProps> = ({ locations }) => {
	return (
		<div>
			<Heading position="right" tilt="right">
				<h2>Locations</h2>
			</Heading>
			<ScrollList className={classes.locations}>
				{locations.map((location) => {
					return <LocationItem location={location} key={location.address} />;
				})}
			</ScrollList>
		</div>
	);
};

export default Locations;
