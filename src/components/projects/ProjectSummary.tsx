import React, {Dispatch, SetStateAction} from "react";
import {deleteProject, ProjectType, updateProjectStatus} from "../../store/reducers/projectReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {firebaseReducer} from "react-redux-firebase";
import {toggleIsModalOpenAC} from "../../store/reducers/appStatusReducer";
import moment from "moment";

type ProjectSummaryType = {
  project: ProjectType,
  setProjectIdForModal: Dispatch<SetStateAction<string>>
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
    dispatch(toggleIsModalOpenAC(true))
    props.setProjectIdForModal(props.project.projectId || '')
  }
  const returnButtonHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    if (props.project.projectStatus === "testing") {
      dispatch(updateProjectStatus("progress", props.project.projectId))
    } else {
      dispatch(updateProjectStatus("testing", props.project.projectId))
    }
  }
  const proceedButtonHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    if (props.project.projectStatus === "progress") {
      dispatch(updateProjectStatus("testing", props.project.projectId))
    } else {
      dispatch(updateProjectStatus("waitingForApprove", props.project.projectId))
    }
  }

  return (
    <div className={'card z-depth-4 projectSummary'}>
      <div className={'card-content grey-text text-darken-3'}>
        <span className={'card-title'}>  {props.project.title}  </span>
        <p> <strong> Posted by:  </strong>{props.project.userFirstName} {props.project.userLastName}</p>
        <p className={'grey-text'}> <strong> Created: </strong>{moment(props.project.createdAt.toDate()).fromNow()}</p>

        {/*!====>>>>>> Icons for editing and deleting project. Only project starter can edit or delete project <<<<<=======!*/}

        {
          props.project.userId === auth.uid &&
          <div className={"iconsBlock"}>
             <i className="material-icons" onClick={editHandler}> edit </i>
             <i className="material-icons" onClick={removeHandler}> delete_forever </i>
          </div>
        }

        {/*----------------------------------------------------------------------------------------------------------------------*/}

        {/*!====>>>>>> Buttons that are changing project status. Only project starter can change the status <<<<<=======!*/}

        <div className={"card-action btn-group"}>
          <button
            className={`btn waves-effect waves-light btn-small green lighten-2 
            ${props.project.projectStatus === "progress" || props.project.userId !== auth.uid ? "disabled" : ""}`}
            onClick={returnButtonHandler}>
            Return
            <i className="material-icons left">fast_rewind</i>
          </button>
          <button
            className={`btn waves-effect waves-light btn-small green lighten-2 
            ${props.project.projectStatus === "waitingForApprove" || props.project.userId !== auth.uid ? "disabled" : ""}`}
            onClick={proceedButtonHandler}>
            Proceed
            <i className="material-icons right">fast_forward</i>
          </button>
        </div>

        {/*----------------------------------------------------------------------------------------------------------------------*/}

      </div>
    </div>
  )
}

export default ProjectSummary