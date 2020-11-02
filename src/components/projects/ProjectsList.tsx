import React, {Dispatch, SetStateAction, useEffect} from "react";
import ProjectSummary from "./ProjectSummary";
import {useDispatch, useSelector} from "react-redux";
import {getProjectsFromFirebase, ProjectReducerType} from "../../store/reducers/projectReducer";
import {AppRootStateType} from "../../store/store";
import {Link} from "react-router-dom";

type ProjectsListType = {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>,
}

const ProjectsList = (props: ProjectsListType) => {
  const dispatch = useDispatch()
  const { projects } = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)

  useEffect(() => {
    dispatch(getProjectsFromFirebase)
  }, [dispatch, projects])

  return (
    <div className={'projectsList section'}>
      {
        projects && projects.map(project => {
          return (
            <Link key={project.projectId} to={`/project/${project.projectId}`}>
              <ProjectSummary project={project} setIsModalOpen={props.setIsModalOpen}/>
            </Link>
          )
        })
      }
    </div>
  )
}

export default ProjectsList