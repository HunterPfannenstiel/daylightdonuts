import { FunctionComponent, useState } from 'react';
import classes from './ToggleSelections.module.css';

interface ToggleSelectionsProps<T> {
	selections: T[];
	selected?: T;
	className?: string;
	selectedClassName?: string;
	prefixTitle?: string;
	onChange: (selection: T) => void;
}

const ToggleSelections: FunctionComponent<ToggleSelectionsProps<any>> = ({
	selections,
	selected,
	className,
	selectedClassName,
	prefixTitle,
	onChange,
}) => {
	if (!className) className = '';
	if (!selectedClassName) selectedClassName = className;

	return (
		<div className={className}>
			{prefixTitle && <p className={classes.title}>{prefixTitle}</p>}
			{selections.map((selection) => (
				<button
					onClick={onChange.bind(this, selection)}
					className={selected === selection ? selectedClassName : ''}
				>
					{selection}
				</button>
			))}
		</div>
	);
};

export default ToggleSelections;
