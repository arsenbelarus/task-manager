import React from "react";
import {Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {firebaseReducer} from "react-redux-firebase";

const Navbar = () => {
  const { auth } = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)

  return (
    <div className="navbar-fixed">
      <nav className='nav-wrapper'>
        <div className='container'>
          <Link to={'/'} className={'brand-logo hide-on-small-and-down'}> TASK-MANAGER </Link>
          {auth.uid ? < SignedInLinks/> : < SignedOutLinks/>}
        </div>
      </nav>
    </div>
  )
}

export default Navbar