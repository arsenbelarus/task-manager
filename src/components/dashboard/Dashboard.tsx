import React, {useEffect, useState} from 'react'
import ProjectsList from "../projects/ProjectsList";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {Redirect} from 'react-router-dom';
import {appStatusReducer, setUrl} from "../../store/reducers/appStatusReducer";
import {firebaseReducer} from "react-redux-firebase";
import Modal from "../common/Modal";
import {getProjectsFromFirebase, ProjectReducerType} from "../../store/reducers/projectReducer";

const Dashboard = () => {
  const [projectIdForModal, setProjectIdForModal] = useState('')

  const dispatch = useDispatch()
  const {auth} = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)
  const {url, isModalOpen} = useSelector<AppRootStateType, ReturnType<typeof appStatusReducer>>(state => state.appStatus)
  const {projects} = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsFromFirebase)
    }
  }, [dispatch, projects])

  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  if (url) {
    dispatch(setUrl(""))
  }
  const projectsInProgress = projects.filter(project => project.projectStatus === "progress")
  const projectsUnderTesting = projects.filter(project => project.projectStatus === "testing")
  const projectsWaitingToBeApproved = projects.filter(project => project.projectStatus === "waitingForApprove")

  return (
    <div className={'dashboard container'}>
{/*      <div className={'row'}>
        <div className={'col s12 m8'}>*/}
        <div className="row projects-header">
          <div className="col s4 center">
            In progress
          </div>
          <div className="col s4 center">
            Under testing
          </div>
          <div className="col s4 center">
            Waiting to be approved
          </div>
        </div>
          <div className="row">
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
{/*        </div>*/}
{/*        <div className={'col s12 m2 offset-m1'}>
          <Notifications/>
        </div>*/}
{/*      </div>*/}
    </div>
  )
}

export default Dashboard