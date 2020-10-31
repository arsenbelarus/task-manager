import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import { isLoaded } from 'react-redux-firebase'

// @ts-ignore
const AuthIsInitialized = ({children}) => {
  const auth = useSelector<AppRootStateType>(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div> State is loading...</div>;
  return children
}

export default AuthIsInitialized