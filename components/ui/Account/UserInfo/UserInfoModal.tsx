import { FormEvent, FunctionComponent, useRef } from 'react';
import classes from './UserInfoModal.module.css';
import { UserInfo } from '@_types/database/userInfo';
import ModalDisplay from 'components/ui/Reusable/Modal/ModalDisplay';
import { ModalProps } from '@_hooks/animation/useAnimateModal';
import TextInput from 'components/ui/Reusable/Form/TextInput';
import SelectInput from 'components/ui/Reusable/Form/SelectInput';

interface UserInfoModalProps {
	onSubmitHandler: (info: UserInfo) => Promise<boolean>;
	deleteHandler: (infoId: number) => void;
	info: UserInfo | null;
	modalProps: ModalProps;
}

const UserInfoModal: FunctionComponent<UserInfoModalProps> = ({
	onSubmitHandler,
	deleteHandler,
	info,
	modalProps,
}) => {
	const formInputs = useRef({
		first_name: info ? info.first_name : '',
		last_name: info ? info.last_name : '',
		phone_number: info ? info.phone_number : '',
		favorite: info ? info.favorite : false,
		id: info ? info.id : -1,
	});

	const formInputHandler = (key: keyof UserInfo, value: any) => {
		formInputs.current[key] = value as never;
	};

	const submitHandler = async (event: FormEvent) => {
		event.preventDefault();
		await onSubmitHandler(formInputs.current);
	};

	return (
		<ModalDisplay {...modalProps} className={classes.modal}>
			<div className={classes.form_container}>
				<h1>{info ? 'Edit User' : 'Add User'}</h1>
				<form className={classes.form} onSubmit={submitHandler}>
					<div className={classes.input_section}>
						<TextInput
							id="first"
							label="First Name:"
							handler={(value) => formInputHandler('first_name', value)}
							className={classes.text_field}
							defaultValue={formInputs.current.first_name}
							placeholder="Daylight"
							required
						/>
						<TextInput
							id="last"
							label="Last Name:"
							handler={(value) => formInputHandler('last_name', value)}
							className={classes.text_field}
							defaultValue={formInputs.current.last_name}
							placeholder="Donuts"
							required
						/>
					</div>
					<div className={classes.input_section}>
						<div className={classes.phone_section}>
							<TextInput
								id="phone"
								label="Phone:"
								inputType="tel"
								handler={(value) => formInputHandler('phone_number', value)}
								className={classes.text_field}
								defaultValue={formInputs.current.phone_number}
								pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
								placeholder="xxx-xxx-xxxx"
								required
							/>
							<p className={classes.format}>Format: xxx-xxx-xxxx</p>
						</div>
						<SelectInput
							id="favorite"
							label="Favorite:"
							handler={(value) => formInputHandler('favorite', value)}
							className={classes.favorite}
							type="checkbox"
							defaultChecked={formInputs.current.favorite}
						/>
					</div>
					<div className={classes.buttons}>
						<button className={classes.submit_btn}>Submit</button>
						{info && (
							<button
								onClick={deleteHandler.bind(this, info.id)}
								className={classes.del_btn}
								type="button"
							>
								Delete
							</button>
						)}
					</div>
				</form>
			</div>
		</ModalDisplay>
	);
};

export default UserInfoModal;
