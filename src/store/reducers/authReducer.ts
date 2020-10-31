import {Dispatch} from "react";
import {authFirebase} from "../../config/firebaseConfig";

const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_ERROR = "SIGNIN_ERROR";

const initState = {
  authError: null
}


export const authReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
      console.log("Login err", action.err)
      return {...state, authError: "Login failed"}
    case "SIGNIN_SUCCESS":
      console.log("Logged in successfully")
      return {...state, authError: null}
  }
  return state
}

// Actions
const SignInSuccessAC = () => ({type: SIGNIN_SUCCESS} as const)
const SignInErrorAC = (err: ErrorType) => ({type: SIGNIN_ERROR, err} as const)

//THUNKS
export const signIn = (credentials: { email: string, password: string }) => {
  return (dispatch: Dispatch<any>) => {
    authFirebase.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch(SignInSuccessAC())
      }).catch((err: ErrorType) => {
      dispatch(SignInErrorAC(err))
    })
  }
}
export const signOut = () => {
  return (dispatch: Dispatch<any>) => {
    authFirebase.signOut()
      .then(() => {
        console.log("Signed out")
      }).catch((err: ErrorType) => {
      console.log("Error while signing out")
    })
  }
}

type ActionType = ReturnType<typeof SignInSuccessAC> | ReturnType<typeof SignInErrorAC>

type ErrorType = {
  a: null,
  code: string,
  message: string
}

export type AuthReducerType = {
  authError: string | null
}
