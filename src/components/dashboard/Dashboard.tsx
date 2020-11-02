import React, {useState} from 'react'
import Notifications from "./Notifications";
import ProjectsList from "../projects/ProjectsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Redirect} from 'react-router-dom';
import {AppStatusReducerType, setUrl} from "../../store/reducers/appStatusReducer";
import {firebaseReducer} from "react-redux-firebase";
import Modal from "../common/Modal";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const {auth} = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)
  const {url} = useSelector<AppRootStateType, AppStatusReducerType>(state => state.appStatus)
  const dispatch = useDispatch()

  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  if (url) {
    dispatch(setUrl(""))
  }

  return (
    <div className={'dashboard container'}>
      <div className={'row'}>
        <div className={'col s12 m8'}>
          <ProjectsList setIsModalOpen={setIsModalOpen}/>
          {isModalOpen && <Modal setIsModalOpen={setIsModalOpen}/>}
        </div>
        <div className={'col s12 m3 offset-m1'}>
          <Notifications/>
        </div>
      </div>
    </div>
  )
}

export default Dashboard