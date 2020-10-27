import React from "react";
import {deleteProjectTC, ProjectType} from "../../store/reducers/projectReducer";
import {useDispatch} from "react-redux";

type ProjectSummaryType = {
  project: ProjectType
}

const ProjectSummary = (props: ProjectSummaryType) => {

  const dispatch = useDispatch()
  const handler = () => {dispatch(deleteProjectTC(props.project.id))}

  return (
    <div className={'card z-depth-0 projectSummary'}>
      <div className={'card-content grey-text text-darken-3'}>
        <span className={'card-title'}>  {props.project.title}  </span>
        <p> Posted by </p>
        <p className={'grey-text'}> date will appear here </p>
        <button onClick={handler}> Delete </button>
      </div>
    </div>
  )
}

export default ProjectSummary