import React from "react";
import {BrowserRouter, Link} from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = () => {
  return (
    <div className="navbar-fixed">
      <nav className='nav-wrapper grey darken-3'>
        <div className='container'>
          <Link to={'/'} className={'brand-logo'}> TASK-MANAGER </Link>
          <SignedInLinks/>
          <SignedOutLinks/>
        </div>
      </nav>
    </div>
  )
}

export default Navbar