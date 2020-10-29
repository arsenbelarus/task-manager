import {Dispatch} from "react";
import {projectsApi} from "../../api/apiFirebase";

const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';

const initState = {
  projects: [
    {id: '1', title: 'help me find peach', description: 'blah blah blah'},
    {id: '2', title: 'collect all the stars', description: 'blah blah blah'},
    {id: '3', title: 'egg hunt with yoshi', description: 'blah blah blah'}
  ]
}
export const projectReducer = (state = initState, action: ActionTypes) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {...state, projects: [action.project, ...state.projects]}
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter(project => project.id !== action.id)}
    default:
      return state
  }

}

//ACTIONS
export const addProjectAC = (project: ProjectType) => ({type: ADD_PROJECT, project} as const)
export const deleteProjectAC = (id: string) => ({type: DELETE_PROJECT, id} as const)

//THUNKS
export const addProject = (project: ProjectType) => {

  return (dispatch: Dispatch<any>, getState: any, getFirestore: () => any, getFirebase: () => any) => {
    // some async with database, then if OK
    projectsApi.sendProject ( {
      ...project,
      userFirstName: 'David',
      userLastName: 'Vaskanian',
      createdAt: new Date(),
    })
      .then(() => { dispatch(addProjectAC(project)) })
      .catch((err: any) => { console.log(err)} )
  }
}
export const deleteProject = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    // some async with database, the if OK
    dispatch(deleteProjectAC(id))
  }
}


type ActionTypes =  | ReturnType<typeof addProjectAC> | ReturnType<typeof deleteProjectAC>


export type ProjectType = {
  id: string,
  title: string,
  description: string,
  userFirstName?: string,
  userLastName?: string,
  createdAt?: Date,
}
export type ProjectReducerType = {
  projects: ProjectType[]
}
