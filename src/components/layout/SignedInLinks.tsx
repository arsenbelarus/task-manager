import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../store/reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {firebaseReducer} from "react-redux-firebase";
import CheckBox from "./Checkbox";

const SignedInLinks = () => {
  const dispatch = useDispatch()
  const { profile, auth } = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)

  const logOutHandler = (email: string | null) => {
    dispatch(signOut(email))
  }

  return (
      <ul className={'right'}>
        <li>
          <CheckBox/>
        </li>
        <li>
          <NavLink to={'/create'} className={"navLink"}> New Project </NavLink>
        </li>
        <li>
          <a onClick={() => logOutHandler(auth.email)} className={"navLink"}> Log Out </a>
        </li>
        <li>
          <NavLink to={'/'} className={'btn btn-floating green lighten-3 navLink'}> {profile.initials} </NavLink>
        </li>

      </ul>
  )
}

export default SignedInLinks