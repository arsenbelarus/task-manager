import React from "react";
import {deleteProject, ProjectType} from "../../store/reducers/projectReducer";
import {useDispatch} from "react-redux";

type ProjectSummaryType = {
  project: ProjectType
}

const ProjectSummary = (props: ProjectSummaryType) => {

  const dispatch = useDispatch()
  const deleteHandler = () => {dispatch(deleteProject(props.project.id))}

  return (
    <div className={'card z-depth-4 projectSummary'}>
      <div className={'card-content grey-text text-darken-3'}>
        <span className={'card-title'}>  {props.project.title}  </span>
        <p> Posted by </p>
        <p className={'grey-text'}> date will appear here </p>
        <i className="material-icons small removeIcon" onClick={deleteHandler}>delete_forever</i>
      </div>
    </div>
  )
}

export default ProjectSummary