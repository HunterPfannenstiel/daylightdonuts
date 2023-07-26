import { FunctionComponent, useState } from 'react';
import classes from './ToggleSelections.module.css';

interface ToggleSelectionsProps<T> {
	selections: T[];
	selected?: T;
	className?: string;
	selectedId?: string;
	prefixTitle?: string;
	onChange: (selection: T) => void;
	comparator?: (selection: T, selected: T) => boolean;
}

const ToggleSelections: FunctionComponent<ToggleSelectionsProps<any>> = ({
	selections,
	selected,
	className,
	selectedId,
	prefixTitle,
	onChange,
	comparator = (selection: any, selected: any) => selection === selected
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
				>
					{selection}
				</button>
			))}
		</div>
	);
};

export default ToggleSelections;
