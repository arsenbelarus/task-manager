import React from 'react';
import {Route, BrowserRouter, Routes} from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/dashboard/Dashboard";
import ProjectDetails from "./components/projects/ProjectDetails";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import CreateProject from "./components/projects/CreateProject";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = ( ) => {
  return (
    <BrowserRouter>
      <Navbar/>
      <ToastContainer position={"bottom-right"} style={{fontSize: "1.2rem", textAlign: "center"}}/>
      <Routes>
        <Route path={'/'} element={Dashboard()} />
        <Route path={'/task-manager'} element={Dashboard()} />
        <Route path={'/project/:id'} element={ProjectDetails()} />
        <Route path={'/signin'} element={SignIn()} />
        <Route path={'/signup'} element={SignUp()} />
        <Route path={'/create'} element={CreateProject()} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
