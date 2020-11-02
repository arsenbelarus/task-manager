import React from "react";
import {Link, Redirect, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ProjectReducerType} from "../../store/reducers/projectReducer";

const ProjectDetails = () => {
  const {id}: { id: string } = useParams();
  const {projects} = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)
  const singleProject = projects?.find(project => project.projectId === id)

  // @ts-ignore
  const { auth } = useSelector<AppRootStateType>(state => state.firebase)


  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  return (
    <div className={'container section projectDetails'}>
      {
        singleProject &&
        <div className={'card z-depth-0'}>
           <div className={'card-content'}>
              <span className={'card-title'}> {singleProject.title} </span>
              <p>
                {singleProject.description}
              </p>
           </div>
           <div className={'card-action grey grey-text lighten-4'}>
              <div>
                Posted by <i> {singleProject.userFirstName} {singleProject.userLastName}</i>
              </div>
              <div>
                 Created on {new Date (singleProject.createdAt.toDate()).toLocaleDateString()}  at  {new Date (singleProject.createdAt.toDate()).getHours()}:{new Date (singleProject.createdAt.toDate()).getMinutes()}`
              </div>
              <Link to={"/"}>
                 <button className={'btn grey darken-2 removeIcon'}> Go back </button>
              </Link>
           </div>
        </div>
      }
    </div>
  )
}

export default ProjectDetails