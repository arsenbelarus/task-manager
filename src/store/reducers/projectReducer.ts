import {Dispatch} from "react";

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

export const addProjectAC = (project: ProjectType) => ({type: ADD_PROJECT, project} as const)
export const deleteProjectTC = (id: string) => {
  return (dispatch: Dispatch<any>) => {
    dispatch({type: DELETE_PROJECT, id})
  }
}


type ActionTypes =  | ReturnType<typeof addProjectAC> | {type: typeof DELETE_PROJECT, id: string}


export type ProjectType = {
  id: string,
  title: string,
  description: string,
}
export type ProjectReducerType = {
  projects: ProjectType[]
}
