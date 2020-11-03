import React from "react";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../store/store";
import { isLoaded } from 'react-redux-firebase'
import Preloader from "../components/common/Preloader";

// @ts-ignore
const AuthIsInitialized = ({children}) => {
  const auth = useSelector<AppRootStateType>(state => state.firebase.auth)
  if (!isLoaded(auth)) return <div className={"main-loader"}> <Preloader color={"red"} size={"big"}/> </div>;
  return children
}

export default AuthIsInitialized