import React, {FormEvent, useState} from "react";
import {AppRootStateType} from "../../store/store";
import {appStatusReducer} from "../../store/reducers/appStatusReducer";
import {Redirect} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {addProject, ProjectType} from "../../store/reducers/projectReducer";
import Preloader from "../common/Preloader";
import {firebaseReducer} from "react-redux-firebase";

const CreateProject = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const {loading, url} = useSelector<AppRootStateType, ReturnType<typeof appStatusReducer>>(state => state.appStatus)
  const {profile, auth} = useSelector<AppRootStateType, ReturnType<typeof firebaseReducer>>(state => state.firebase)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const projectFromForm: ProjectType = {
      title,
      description,
      userFirstName: profile.firstName,
      userLastName: profile.lastName,
      userId: auth.uid,
      projectStatus: "progress",
    }
    dispatch(addProject(projectFromForm))
    setTitle('')
    setDescription('')
  }

  if (!auth.uid) {
    return <Redirect to={"/signin"}/>
  }

  if (url) {
    return <Redirect to={url}/>
  }

  return (
    <div className={'container'}>
      <form onSubmit={handleSubmit} className={'white'}>
        <h4 className={'grey-text text-darken-3 center'}> Create Project </h4>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="title"> Project Title </label>
              <input type={"text"} id={'title'} value={title} onChange={e => setTitle(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field'}>
              <label htmlFor="description"> Project Description </label>
              <textarea className={'materialize-textarea'}
                        id={'description'}
                        value={description}
                        onChange={e => setDescription(e.target.value)}/>
            </div>
          </div>
        </div>
        <div className={'row'}>
          <div className={'col s12'}>
            <div className={'input-field center'}>
              <button className={'btn green lighten-2 btnSignUP'}>
                {loading ? <Preloader color={"green"} size={"small"}/> : `Create Project`}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProject