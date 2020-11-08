import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {appStatusReducer, toggleIsMine} from "../../store/reducers/appStatusReducer";
import {AppRootStateType} from "../../store/store";


const CheckBox = () => {
  const dispatch = useDispatch()
  const {isMine} = useSelector<AppRootStateType, ReturnType<typeof appStatusReducer>>(state => state.appStatus)


  const checkBoxHandler = (e: React.BaseSyntheticEvent<MouseEvent, EventTarget & HTMLElement, EventTarget>) => {
    e.preventDefault()
    dispatch(toggleIsMine())
  }

  return (
    <div className={"checkbox"}>
      <label onClick={checkBoxHandler}>
        <input id={"indeterminate-checkbox"} type={"checkbox"} checked={isMine}/>
        <span>My projects only</span>
      </label>
    </div>
  )
}

export default CheckBox