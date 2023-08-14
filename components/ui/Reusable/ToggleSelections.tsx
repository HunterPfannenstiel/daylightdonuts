import classes from './ToggleSelections.module.css';

interface ToggleSelectionsProps<T> {
	selections: T[];
	selected?: T;
	className?: string;
	selectedId?: string;
	onChange: (selection: T) => void;
	comparator?: (selection: T, selected?: T) => boolean;
	disabled?: boolean;
}

const ToggleSelections: <T>(props: ToggleSelectionsProps<T>) => JSX.Element = ({
	selections,
	selected,
	className,
	selectedId,
	onChange,
	comparator = (selection, selected?) => selection === selected,
	disabled,
}) => {
	if (!className) className = '';
	if (!selectedId) selectedId = className;

	return (
		<div className={className}>
			{selections.map((selection) => (
				<button
					onClick={onChange.bind(this, selection)}
					id={comparator(selection, selected) ? selectedId : ''}
					key={Math.random()}
					disabled={disabled}
				>
					{`${selection}`}
				</button>
			))}
		</div>
	);
};

export default ToggleSelections;
