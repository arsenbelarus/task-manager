import React, {FormEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {signIn} from "../../store/reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {Redirect} from "react-router-dom";
import Preloader from "../common/Preloader";

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  // @ts-ignore
  const { auth } = useSelector<AppRootStateType>(state => state.firebase)
  const loading = useSelector<AppRootStateType>(state => state.appStatus.loading)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn({email, password}))
  }

  if (auth.uid) {
    return <Redirect to={"/task-manager"}/>
  }

  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'white'}>
        <h4 className={'grey-text text-darken-3 center'}> Sign In </h4>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="email"> Email </label>
              <input type={"email"} id={'email'} value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="password"> Password </label>
              <input type={"password"} id={'password'} value={password} onChange={e => setPassword(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field center'}>
              <button className={'btn green lighten-2 btnSignUP'}> {loading ? <Preloader color={"green"} size={"small"}/> : "SIGN IN"} </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default SignIn