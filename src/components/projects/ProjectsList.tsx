import React, {Dispatch, SetStateAction, useEffect} from "react";
import ProjectSummary from "./ProjectSummary";
import {useDispatch, useSelector} from "react-redux";
import {
  getProjectsFromFirebase,
  projectReducer,
  ProjectReducerType,
  ProjectType
} from "../../store/reducers/projectReducer";
import {AppRootStateType} from "../../store/store";
import {Link} from "react-router-dom";

type ProjectsListType = {
  setProjectIdForModal: Dispatch<SetStateAction<string>>
}

const ProjectsList = (props: ProjectsListType) => {
  const dispatch = useDispatch()
  const {projects} = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)
  console.log(projects)

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(getProjectsFromFirebase)
    }
  }, [dispatch, projects])

  return (
    <div className={'projectsList section'}>
      {
        projects && projects.map((project: ProjectType) => {
          return (
            <Link key={project.projectId} to={`/project/${project.projectId}`}>
              <ProjectSummary project={project} setProjectIdForModal={props.setProjectIdForModal}/>
            </Link>
          )
        })
      }
    </div>
  )
}

export default ProjectsList