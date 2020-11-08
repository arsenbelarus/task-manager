import React, {useEffect, useState} from 'react'
import ProjectsList from "../projects/ProjectsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Redirect} from 'react-router-dom';
import {appStatusReducer, setUrl, toggleIsMine} from "../../store/reducers/appStatusReducer";
import {firebaseReducer} from "react-redux-firebase";
import Modal from "../common/Modal";
import {getProjectsFromFirebase, ProjectReducerType} from "../../store/reducers/projectReducer";
import ProjectHeader from "../layout/ProjectHeader";



const Dashboard = () => {
  const [projectIdForModal, setProjectIdForModal] = useState('')

  const dispatch = useDispatch()
  const {auth} = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)
  const {url, isModalOpen, isMine} = useSelector<AppRootStateType, ReturnType<typeof appStatusReducer>>(state => state.appStatus)
  const {projects} = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)
  // ==========>>>>>>>>>>>>>>> This line is handling the checkbox from navbar
  const projectsToBeRendered = !isMine ? projects : projects.filter(project => project.userId === auth.uid)
  // ==========>>>>>>>>>>>>>>> Next 3 lines are for dividing projects into columns
  const projectsInProgress = projectsToBeRendered.filter(project => project.projectStatus === "progress")
  const projectsUnderTesting = projectsToBeRendered.filter(project => project.projectStatus === "testing")
  const projectsWaitingToBeApproved = projectsToBeRendered.filter(project => project.projectStatus === "waitingForApprove")

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsFromFirebase)
    }
  }, [dispatch])

  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  if (url) {
    dispatch(setUrl(""))
  }

  return (
    <div className={'dashboard container'}>
      <ProjectHeader/>
      <div className="row projects-content">
        <div className="col s4">
          <ProjectsList setProjectIdForModal={setProjectIdForModal} projects={projectsInProgress}/>
          {isModalOpen && <Modal projectIdForModal={projectIdForModal}/>}
        </div>
        <div className="col s4">
          <ProjectsList setProjectIdForModal={setProjectIdForModal} projects={projectsUnderTesting}/>
          {isModalOpen && <Modal projectIdForModal={projectIdForModal}/>}
        </div>
        <div className="col s4">
          <ProjectsList setProjectIdForModal={setProjectIdForModal} projects={projectsWaitingToBeApproved}/>
          {isModalOpen && <Modal projectIdForModal={projectIdForModal}/>}
        </div>
      </div>
    </div>
  )
}

export default Dashboard