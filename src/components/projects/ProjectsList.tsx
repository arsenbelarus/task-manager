import React, {useEffect} from "react";
import ProjectSummary from "./ProjectSummary";
import {useDispatch, useSelector} from "react-redux";
import {getProjectsFromFirebase, ProjectReducerType} from "../../store/reducers/projectReducer";
import {AppRootStateType} from "../../store/store";

const ProjectsList = () => {
  const dispatch = useDispatch()
  const { projects } = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)

  useEffect(() => {
    dispatch(getProjectsFromFirebase)
  }, [projects, dispatch])

  return (
    <div className={'projectsList section'}>
      {
        projects && projects.map(project => {
          return <ProjectSummary key={project.id} project={project}/>
        })
      }
    </div>
  )
}

export default ProjectsList