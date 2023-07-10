import { FunctionComponent, useState } from 'react';
import classes from './ToggleSelections.module.css';

interface ToggleSelectionsProps<T> {
	selections: T[];
	onChange: (selection: T) => void;
}

const ToggleSelections: FunctionComponent<ToggleSelectionsProps<any>> = ({
	selections,
	onChange,
}) => {
	const [selection, setSelection] = useState(selections[0]);

	return (
		<>
			{selections.map((selection) => (
				<button onClick={onChange.bind(this, selection)}>{selection}</button>
			))}
		</>
	);
};

export default ToggleSelections;
