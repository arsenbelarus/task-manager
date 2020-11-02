import React, {Dispatch, SetStateAction} from "react";
import {deleteProject, ProjectType} from "../../store/reducers/projectReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {firebaseReducer} from "react-redux-firebase";

type ProjectSummaryType = {
  project: ProjectType,
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
}

const ProjectSummary = (props: ProjectSummaryType) => {
  const dispatch = useDispatch()
  const {auth} = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)

  const removeHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    dispatch(deleteProject(props.project.projectId))
  }
  const editHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    props.setIsModalOpen(true)
  }

  return (
    <div className={'card z-depth-4 projectSummary'}>
      <div className={'card-content grey-text text-darken-3'}>
        <span className={'card-title'}>  {props.project.title}  </span>
        <p> {`Posted by ${props.project.userFirstName} ${props.project.userLastName}`} </p>
        <p className={'grey-text'}> {
          `Created on ${new Date(props.project.createdAt.toDate()).toLocaleDateString()}  at  ${new Date(props.project.createdAt.toDate()).getHours()}:${new Date(props.project.createdAt.toDate()).getMinutes()}`
        }
        </p>
        {
          props.project.userId === auth.uid &&
             <div className={"iconsBlock"}>
                <i className="material-icons small" onClick={editHandler}> edit </i>
                <i className="material-icons small" onClick={removeHandler}> delete_forever </i>
             </div>
        }
      </div>
    </div>
  )
}

export default ProjectSummary