import React, {Dispatch, SetStateAction, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {ProjectReducerType, updateProject} from "../../store/reducers/projectReducer";
import {toggleIsModalOpenAC} from "../../store/reducers/appStatusReducer";

type ModalPropsType = {
  projectIdForModal: string,
}

const Modal = (props: ModalPropsType) => {
  const dispatch = useDispatch()
  const { projects } = useSelector<AppRootStateType, ProjectReducerType>(state => state.project)
  const projectForModal = projects?.find(project => project.projectId === props.projectIdForModal)

  const [title, setTitle] = useState(projectForModal?.title)
  const [description, setDescription] = useState(projectForModal?.description)

  const projectEditHandler = () => {
    const dataForUpdate = {
      title,
      description,
      updatedProjectId: projectForModal?.projectId
    }
    dispatch(updateProject(dataForUpdate))
  }
  const dismissHandler = () => {
    dispatch(toggleIsModalOpenAC(false))
  }

  return (
    <div className={"modal-container"}>
      <div className={"modal"}>
        <div className={"modal-content"}>
          <h4> Edit project </h4>
          <div className={'input-field'}>
            <label htmlFor="title"> Project Title </label>
            <input type={"text"}
                   id={'title'}
                   value={title}
                   onChange={e => setTitle(e.target.value)}
                   autoFocus={true}/>
          </div>
          <div className={'input-field'}>
            <label htmlFor="description"> Project Description </label>
            <textarea className={'materialize-textarea'}
                      id={'description'}
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      autoFocus={true}
            />
          </div>
        </div>
        <div className={"modal-footer"}>
          <a className="modal-close waves-effect waves-green btn-flat"
             onClick={projectEditHandler}>
            Edit
          </a>
          <a className="modal-close waves-effect waves-green btn-flat"
             onClick={dismissHandler}>
            Dismiss
          </a>
        </div>
      </div>
    </div>

  )
}

export default Modal

