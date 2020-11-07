import React, { Dispatch, SetStateAction } from "react";
import ProjectSummary from "./ProjectSummary";
import { ProjectType } from "../../store/reducers/projectReducer";
import { Link } from "react-router-dom";

type ProjectsListType = {
  setProjectIdForModal: Dispatch<SetStateAction<string>>
  projects: ProjectType[]
}

const ProjectsList = (props: ProjectsListType) => {

  return (
    <div className={'projectsList section'}>
      {
        props.projects.map((project: ProjectType) => {
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