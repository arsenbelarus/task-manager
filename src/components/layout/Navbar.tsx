import React from "react";
import {Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";

const Navbar = () => {
  // @ts-ignore
  const { auth } = useSelector<AppRootStateType>(state => state.firebase)

  return (
    <div className="navbar-fixed">
      <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
          <Link to={'/'} className={'brand-logo'}> TASK-MANAGER </Link>
          {auth.uid ? < SignedInLinks/> : < SignedOutLinks/>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar