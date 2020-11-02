import {Dispatch} from "react";
import {projectFirestore, timestamp} from "../../config/firebaseConfig"
import {setUrl, toggleLoadingAC} from "./appStatusReducer";

const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const SET_PROJECTS = 'SET_PROJECTS'

const initState = {
  projects: []
}
export const projectReducer = (state = initState, action: ActionTypes) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {...state, projects: [action.project, ...state.projects]}
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter((project: ProjectType)  => project.projectId !== action.id)}
    case SET_PROJECTS:
      return {...state, projects: action.data}
    default:
      return state
  }

}

//ACTIONS
export const addProjectAC = (project: ProjectType) => ({type: ADD_PROJECT, project} as const)
export const deleteProjectAC = (id: string | undefined) => ({type: DELETE_PROJECT, id} as const)
export const setProjectsAC = (data: ProjectType[]) => ({type: SET_PROJECTS, data} as const)

//THUNKS
export const addProject = (project: ProjectType) => {
  debugger
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    // call to cloud firestore
    projectFirestore.collection('projects').add({
      ...project,
      createdAt: timestamp()
    })
      .then(() => {
        dispatch(getProjectsFromFirebase)
        dispatch(setUrl("/"))
      })
      .catch((err: any) => {
        throw new Error(err)
      })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
      })

    /*
          // This is a request example using REST API and axios

          projectsApi.sendProject ( {
          ...project,
          userFirstName: 'David',
          userLastName: 'Vaskanian',
          createdAt: new Date(),
        })
          .then(() => { dispatch(addProjectAC(project)) })
          .catch((err: any) => { console.log(err)} )
    */

  }
}
export const deleteProject = (id: string | undefined) => {
  return (dispatch: Dispatch<any>) => {
    // some async with database, the if OK
    projectFirestore.collection("projects").doc(id).delete()
      .then(() => {
        dispatch(deleteProjectAC(id))
      })
      .catch((err: any) => {
        throw new Error(err)
      })
  }
}
export const getProjectsFromFirebase = (dispatch: Dispatch<any>) => {
  const projectsFromServer: ProjectType[] = []
  projectFirestore.collection("projects").orderBy("createdAt", "desc").get()
    .then((querySnapshot) => {
      querySnapshot.forEach((project) => {
        const id = project.id
        const data = project.data()
        projectsFromServer.push({
          projectId: id,
          title: data.title,
          description: data.description,
          createdAt: data.createdAt,
          userFirstName: data.userFirstName,
          userLastName: data.userLastName,
          userId: data.userId
        })
      });
      dispatch(setProjectsAC(projectsFromServer))
    });

  // This is a request example using REST API and axios
  /*  const data = await projectsApi.getProjects()
    try {
      dispatch(setProjectsAC(data.data))
    } catch (err) {
      console.log(err)
    }*/
}



type ActionTypes =
  | ReturnType<typeof addProjectAC>
  | ReturnType<typeof deleteProjectAC>
  | ReturnType<typeof setProjectsAC>


export type ProjectType = {
  title: string,
  description: string,
  userFirstName: string,
  userLastName: string,
  userId: string
  createdAt?: any,
  projectId?: string,
}
export type ProjectReducerType = {
  projects: ProjectType[] | null
}
