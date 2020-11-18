import {Dispatch} from "react";
import {projectFirestore, timestamp} from "../../config/firebaseConfig"
import {setUrl, toggleIsModalOpenAC, toggleLoadingAC} from "./appStatusReducer";
import {toast} from "react-toastify";

const ADD_PROJECT = 'ADD_PROJECT';
const DELETE_PROJECT = 'DELETE_PROJECT';
const SET_PROJECTS = 'SET_PROJECTS';
const UPDATE_PROJECTS = 'UPDATE_PROJECTS';
const UPDATE_PROJECT_STATUS = 'UPDATE_PROJECT_STATUS';

const initState = {
  projects: []
}
export const projectReducer = (state = initState, action: ActionTypes) => {
  switch (action.type) {
    case ADD_PROJECT:
      return {...state, projects: [action.project, ...state.projects]}
    case DELETE_PROJECT:
      return {...state, projects: state.projects.filter((project: ProjectType) => project.projectId !== action.id)}
    case SET_PROJECTS:
      return {...state, projects: action.data}
    case UPDATE_PROJECTS:
      return {
        ...state,
        projects: state.projects.map(
          (project: ProjectType) => project.projectId === action.data.updatedProjectId
            ? {...project, title: action.data.title, description: action.data.description}
            : project
        )
      }
    case UPDATE_PROJECT_STATUS:
      return {
        ...state,
        projects: state.projects.map(
          (project: ProjectType) => project.projectId === action.projectId ? {...project, projectStatus: action.status} : project
        )
      }
    default:
      return state
  }
}

//ACTIONS
export const addProjectAC = (project: ProjectType) => ({type: ADD_PROJECT, project} as const)
export const deleteProjectAC = (id: string | undefined) => ({type: DELETE_PROJECT, id} as const)
export const updateProjectAC = (data: UpdateType) => ({type: UPDATE_PROJECTS, data} as const)
export const setProjectsAC = (data: ProjectType[]) => ({type: SET_PROJECTS, data} as const)
export const updateProjectStatusAC = (status: ProjectStatusType, projectId: string | undefined) => ({
  type: UPDATE_PROJECT_STATUS,
  status,
  projectId
} as const)

//THUNKS
export const addProject = (project: ProjectType) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    // call to cloud firestore
    const projectForFirestore = {
      ...project,
      createdAt: timestamp()
    }
    projectFirestore.collection('projects').add({
      ...projectForFirestore
    })
      .then(() => {
        projectFirestore.collection('projects').orderBy("createdAt", "desc").limit(1).get()
          .then((querySnapshot) => {
            querySnapshot.forEach((project) => {
              const id = project.id
              const data = project.data()
              dispatch(addProjectAC({
                projectId: id,
                title: data.title,
                description: data.description,
                createdAt: data.createdAt,
                userFirstName: data.userFirstName,
                userLastName: data.userLastName,
                userId: data.userId,
                projectStatus: data.projectStatus,
              }))
              dispatch(setUrl("/task-manager"))
              toast.success("Project successfully added")
            });
          })
          .catch((err: any) => {
            toast.error(err.message)
          })
      })
      .catch((err: any) => {
        toast.error(err.message)
      })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
      })
  }
}
export const deleteProject = (id: string | undefined) => {
  return (dispatch: Dispatch<any>) => {
    projectFirestore.collection("projects").doc(id).delete()
      .then(() => {
        dispatch(deleteProjectAC(id))
        toast.success("Project successfully deleted")
      })
      .catch((err: any) => {
        toast.error(err.message)
      })
  }
}
export const updateProject = (dataForUpdate: UpdateType) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    projectFirestore.collection("projects").doc(dataForUpdate.updatedProjectId).update({
      title: dataForUpdate.title,
      description: dataForUpdate.description
    })
      .then(() => {
        dispatch(updateProjectAC(dataForUpdate))
        dispatch(toggleIsModalOpenAC(false))
        toast.success("Project successfully updated")
      })
      .catch((err: any) => {
        toast.error(err.message)
      })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
      })
  }
}
export const updateProjectStatus = (status: ProjectStatusType, projectId: string | undefined) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    projectFirestore.collection("projects").doc(projectId).update({
      projectStatus: status,
    })
      .then(() => {
        dispatch(updateProjectStatusAC(status, projectId))
        toast.success("Project status successfully updated")
      })
      .catch((err: any) => {
        toast.error(err.message)
      })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
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
          userId: data.userId,
          projectStatus: data.projectStatus,
        })
      });
      dispatch(setProjectsAC(projectsFromServer))
    })
    .catch((err) => {
      toast.error(err.message)
    })
}


type ActionTypes =
  | ReturnType<typeof addProjectAC>
  | ReturnType<typeof deleteProjectAC>
  | ReturnType<typeof setProjectsAC>
  | ReturnType<typeof updateProjectAC>
  | ReturnType<typeof updateProjectStatusAC>


export type ProjectType = {
  title: string,
  description: string,
  userFirstName: string,
  userLastName: string,
  userId: string
  createdAt?: any,
  projectId?: string,
  projectStatus: ProjectStatusType,
}
type ProjectStatusType = "progress" | "testing" | "waitingForApprove"
type UpdateType = {
  title: string | undefined,
  description: string | undefined,
  updatedProjectId: string | undefined
}
export type ProjectReducerType = {
  projects: ProjectType[]
}
