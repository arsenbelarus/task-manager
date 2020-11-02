import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../store/reducers/authReducer";
import {AppRootStateType} from "../../store/store";
import {firebaseReducer} from "react-redux-firebase";

const SignedInLinks = () => {
  const dispatch = useDispatch()
  const { profile } = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)

  const logOutHandler = () => {
    dispatch(signOut())
  }

  return (
      <ul className={'right'}>
        <li>
          <NavLink to={'/create'}> New Project </NavLink>
        </li>
        <li>
          <a onClick={logOutHandler}> Log Out </a>
        </li>
        <li>
          <NavLink to={'/'} className={'btn btn-floating green lighten-3'}> {profile.initials} </NavLink>
        </li>
      </ul>
  )
}

export default SignedInLinks