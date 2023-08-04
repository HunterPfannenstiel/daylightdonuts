import classes from './ToggleSelections.module.css';

interface ToggleSelectionsProps<T> {
	selections: T[];
	selected?: T;
	className?: string;
	selectedId?: string;
	prefixTitle?: string;
	onChange: (selection: T) => void;
	comparator?: (selection: T, selected?: T) => boolean;
	disabled?: boolean;
}

const ToggleSelections: <T>(props: ToggleSelectionsProps<T>) => JSX.Element = ({
	selections,
	selected,
	className,
	selectedId,
	prefixTitle,
	onChange,
	comparator = (selection, selected?) => selection === selected,
	disabled,
}) => {
	if (!className) className = '';
	if (!selectedId) selectedId = className;

	return (
		<div className={className}>
			{prefixTitle && <p className={classes.title}>{prefixTitle}</p>}
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
