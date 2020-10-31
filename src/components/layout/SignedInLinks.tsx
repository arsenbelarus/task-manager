import React from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../../store/reducers/authReducer";

const SignedInLinks = () => {
  const dispatch = useDispatch()

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
          <NavLink to={'/'} className={'btn btn-floating green lighten-3'}> AV </NavLink>
        </li>
      </ul>
  )
}

export default SignedInLinks