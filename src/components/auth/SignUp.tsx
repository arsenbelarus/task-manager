import React, { FormEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from '../../store/store';
import Preloader from '../common/Preloader';
import { signUp } from '../../store/reducers/authReducer';
import { firestoreReducer } from 'redux-firestore';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');

	const auth = useSelector<
		AppRootStateType,
		ReturnType<typeof firestoreReducer>
	>((state) => state.firebase.auth);
	const loading = useSelector<AppRootStateType>(
		(state) => state.appStatus.loading
	);
	const dispatch = useDispatch();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signUp({ email, password, firstName, lastName }));
	};

	if (auth.uid) {
		return <Navigate to={'/task-manager'} />;
	}

	return (
		<div className={'container'}>
			<form onSubmit={handleSubmit} className={'white'}>
				<h4 className={'grey-text text-darken-3 center'}> SIGN UP </h4>
				<div className={'row'}>
					<div className={'col s12 m6'}>
						<div className={'input-field'}>
							<label htmlFor='firstName'> First Name </label>
							<input
								type={'text'}
								id={'firstName'}
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
							/>
						</div>
					</div>
					<div className={'col s12 m6'}>
						<div className={'input-field'}>
							<label htmlFor='lastName'> Last Name </label>
							<input
								type={'text'}
								id={'lastName'}
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className={'row'}>
					<div className={'col s12'}>
						<div className={'input-field'}>
							<label htmlFor='email'> Email </label>
							<input
								type={'email'}
								id={'email'}
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className={'row'}>
					<div className={'col s12'}>
						<div className={'input-field'}>
							<label htmlFor='password'> Password </label>
							<input
								type={'password'}
								id={'password'}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</div>
					</div>
				</div>
				<div className={'row'}>
					<div className={'col s12'}>
						<div className={'input-field center'}>
							<button className={'btn green lighten-2 btnSignUP'}>
								{' '}
								{loading ? (
									<Preloader color={'green'} size={'small'} />
								) : (
									'SIGN UP'
								)}{' '}
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
