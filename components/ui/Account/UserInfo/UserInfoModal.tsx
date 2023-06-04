import { FormEvent, FunctionComponent, useRef } from 'react';
import classes from './UserInfoModal.module.css';
import { AddUserInfo, UserInfo } from '@_types/database/userInfo';

interface UserInfoModalProps {
	callback: (info: UserInfo) => Promise<boolean>;
	exitHandler: () => void;
	infoId: number | null;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
	callback,
	exitHandler,
	infoId,
}) => {
	const firstNameRef = useRef<HTMLInputElement>(null);
	const lastNameRef = useRef<HTMLInputElement>(null);
	const phoneNumberRef = useRef<HTMLInputElement>(null);
	const favoriteRef = useRef<HTMLInputElement>(null);

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		const enteredInfo = {
			first_name: firstNameRef.current!.value,
			last_name: lastNameRef.current!.value,
			phone_number: phoneNumberRef.current!.value,
			favorite: favoriteRef.current!.checked,
			id: infoId ? infoId : -1,
		};
		const success = await callback(enteredInfo);
		/* if (success) {
			firstNameRef.current!.value = '';
			lastNameRef.current!.value = '';
			phoneNumberRef.current!.value = '';
			favoriteRef.current!.checked = false;
			console.log('It worked!');
		} else {
			console.log('There was an error!');
		} */
	};

	return (
		<>
		<button className={classes.exit} onClick={exitHandler}>Exit</button>
			<div className={classes.form_container}>
				<form className={classes.form} onSubmit={submitHandler}>
					<div className={classes.field}>
						<label htmlFor="first">First Name:</label>
						<input type="text" name="first" ref={firstNameRef} required />
					</div>
					<div className={classes.field}>
						<label htmlFor="last">Last Name:</label>
						<input type="text" name="last" ref={lastNameRef} required />
					</div>
					<div className={classes.field}>
						<label htmlFor="phone">Phone:</label>
						<input type="tel" name="phone" ref={phoneNumberRef} required />
					</div>
					<div className={classes.field}>
						<label htmlFor="favorite">Favorite: </label>
						<input type="checkbox" name="favorite" ref={favoriteRef} />
					</div>
					<button>Submit</button>
				</form>
			</div>
		</>
	);
};

export default UserInfoModal;
