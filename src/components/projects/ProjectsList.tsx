import React, {useEffect} from "react";
import ProjectSummary from "./ProjectSummary";
import {useDispatch, useSelector} from "react-redux";
import {getProjectsFromFirebase, ProjectReducerType} from "../../store/reducers/projectReducer";
import {AppRootStateType} from "../../store/store";
import {Link} from "react-router-dom";

const ProjectsList = () => {
  const dispatch = useDispatch()
  const { projects } = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)

  useEffect(() => {
    dispatch(getProjectsFromFirebase)
  }, [dispatch])

  return (
    <div className={'projectsList section'}>
      {
        projects && projects.map(project => {
          return (
            <Link key={project.id} to={`/project/${project.id}`}>
              <ProjectSummary key={project.id} project={project}/>
            </Link>
          )
        })
      }
    </div>
  )
}

export default ProjectsList