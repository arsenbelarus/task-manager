import React from "react";
import ProjectSummary from "./ProjectSummary";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ProjectReducerType} from "../../store/reducers/projectReducer";

const ProjectsList = () => {
  const data = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)

  return (
    <div className={'projectsList section'}>
      {
        data && data.projects.map(project => {
          return <ProjectSummary key={project.id} project={project}/>
        })
      }
    </div>
  )
}

export default ProjectsList