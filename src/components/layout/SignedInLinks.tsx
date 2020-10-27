import React from "react";
import {NavLink} from "react-router-dom";

const SignedInLinks = () => {
  return (
      <ul className={'right'}>
        <li>
          <NavLink to={'/create'}> New Project </NavLink>
        </li>
        <li>
          <NavLink to={'/signin'}> Log Out </NavLink>
        </li>
        <li>
          <NavLink to={'/'} className={'btn btn-floating green lighten-3'}> AV </NavLink>
        </li>
      </ul>
  )
}

export default SignedInLinks