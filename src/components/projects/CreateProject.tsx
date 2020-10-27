import React, {FormEvent, useState} from "react";
import {useDispatch} from "react-redux";
import {addProjectAC} from "../../store/reducers/projectReducer";
import { v4 as uuidv4 } from 'uuid';

const CreateProject = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const projectFromForm = {id: uuidv4(), title, description}
    dispatch(addProjectAC(projectFromForm))
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
              <button className={'btn green lighten-2 btnSignUP'}> Create Project </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default CreateProject