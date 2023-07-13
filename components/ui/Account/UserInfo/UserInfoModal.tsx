import { FormEvent, FunctionComponent, useRef } from 'react';
import classes from './UserInfoModal.module.css';
import { AddUserInfo, UserInfo } from '@_types/database/userInfo';

interface UserInfoModalProps {
	onSubmitHandler: (info: UserInfo, infoIdx: number | null) => Promise<boolean>;
	exitHandler: () => void;
	deleteHandler: (id: number) => Promise<boolean>;
	info: UserInfo | null;
	infoIdx: number | null;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
	onSubmitHandler,
	exitHandler,
	deleteHandler,
	info,
	infoIdx,
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
			id: info ? info.id : -1,
		};
		const success = await onSubmitHandler(enteredInfo, infoIdx);
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
			<button className={classes.exit} onClick={exitHandler}>
				x
			</button>
			<div className={classes.form_container}>
				<h1>{info ? "Edit User" : "Add User"}</h1>
				<form className={classes.form} onSubmit={submitHandler}>
					<div className={classes.text_field}>
						<label htmlFor="first">First Name</label>
						<input
							type="text"
							id="first"
							name="first"
							ref={firstNameRef}
							defaultValue={info ? info.first_name : ''}
							required
						/>
					</div>
					<div className={classes.text_field}>
						<label htmlFor="last">Last Name</label>
						<input
							type="text"
							id="last"
							name="last"
							ref={lastNameRef}
							defaultValue={info ? info.last_name : ''}
							required
						/>
					</div>
					<div className={classes.text_field}>
						<label htmlFor="phone">Phone</label>
						<input
							type="tel"
							id="phone"
							name="phone"
							ref={phoneNumberRef}
							defaultValue={info ? info.phone_number : ''}
							required
						/>
					</div>
					<div className={classes.field}>
						<label htmlFor="favorite">Favorite</label>
						<input
							type="checkbox"
							id="favorite"
							name="favorite"
							ref={favoriteRef}
							defaultChecked={info ? info.favorite : false}
						/>
					</div>
					<button className={classes.submit_btn}>Submit</button>
					{infoIdx && <button onClick={deleteHandler.bind(this, infoIdx)} className={classes.del_btn}>Delete</button>}
				</form>
			</div>
		</>
	);
};

export default UserInfoModal;
