import React from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer position={"bottom-right"} style={{fontSize: "1.2rem", textAlign: "center"}}/>
      <Switch>
        <Route exact path={'/'} component={Dashboard} />
        <Route path={'/project/:id'} component={ProjectDetails} />
        <Route path={'/signin'} component={SignIn} />
        <Route path={'/signup'} component={SignUp} />
        <Route path={'/create'} component={CreateProject} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
