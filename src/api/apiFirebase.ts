import axios from "axios";
import {ProjectType} from "../store/reducers/projectReducer";

const axiosFirebase = axios.create({
  baseURL: 'https://task-manager-arsen.firebaseio.com/',
  headers: {
    "Content-Type": "text/plain",
    "API-KEY": "AIzaSyAoiQDQ0uj3l1_XZbRlBarC-qk-IECqfYo",
  },
})

export const projectsApi = {
  sendProject (project: ProjectType) {
    return axiosFirebase.post('projects.json', project)
  },
  getProjects () {
    return axiosFirebase.get('projects.json')
  },
/*  deletePost (serverID: string) {
    return axiosFireBase.delete(`posts/${serverID}.json`)
  }*/
}