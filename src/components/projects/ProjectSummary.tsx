import React from "react";
import {deleteProject, ProjectType} from "../../store/reducers/projectReducer";
import {useDispatch} from "react-redux";

type ProjectSummaryType = {
  project: ProjectType
}

const ProjectSummary = (props: ProjectSummaryType) => {
  const dispatch = useDispatch()

  const removeHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    dispatch(deleteProject(props.project.projectId))
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
          <i className="material-icons small removeIcon" onClick={removeHandler}> delete_forever
          </i>
      </div>
    </div>
  )
}

export default ProjectSummary