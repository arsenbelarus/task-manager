import React from 'react'
import Notifications from "./Notifications";
import ProjectsList from "../projects/ProjectsList";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import { Redirect } from 'react-router-dom';

const Dashboard = () => {
  // @ts-ignore
  const { auth } = useSelector<AppRootStateType>(state => state.firebase)


  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  return (
    <div className={'dashboard container'}>
      <div className={'row'}>
        <div className={'col s12 m8'}>
          <ProjectsList/>
        </div>
        <div className={'col s12 m3 offset-m1'}>
          <Notifications/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard