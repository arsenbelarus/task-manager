import {Dispatch} from "react";
import {authFirebase, projectFirestore} from "../../config/firebaseConfig";
import {toggleLoadingAC} from "./appStatusReducer";

const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_ERROR = "SIGNIN_ERROR";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";
const SET_USER_DATA = "SET_USER_DATA";

const initState = {
  authError: null,
  userProfileData: null
}


export const authReducer = (state = initState, action: ActionType) => {
  switch (action.type) {
    case "SIGNIN_ERROR":
      console.log("Login err", action.err)
      return {...state, authError: action.err.message}
    case "SIGNIN_SUCCESS":
      console.log("Logged in successfully")
      return {...state, authError: null}
    case "SIGNUP_SUCCESS":
      console.log("signed up successfully")
      return {...state, authError: null}
    case "SIGNUP_ERROR":
      console.log("Sign up error => ", action.err)
      return {...state, authError: action.err.message}
  }
  return state
}

// Actions
const SignInSuccessAC = () => ({type: SIGNIN_SUCCESS} as const)
const SignInErrorAC = (err: ErrorType) => ({type: SIGNIN_ERROR, err} as const)
const SignUpSuccessAC = () => ({type: SIGNUP_SUCCESS} as const)
const SignUpErrorAC = (err: ErrorType) => ({type: SIGNUP_ERROR, err} as const)
const SetUserProfileDataAC = (userData: any) => ({type: SET_USER_DATA, userData})

//THUNKS
export const signIn = (credentials: { email: string, password: string }) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    authFirebase.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch(SignInSuccessAC())
      })
      .catch((err: ErrorType) => {
      dispatch(SignInErrorAC(err))
    })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
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
export const signUp = (newUser: NewUserType) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    authFirebase.createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((res) => {
        return projectFirestore.collection("users").doc(res.user?.uid).set({
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          initials: newUser.firstName[0] + newUser.lastName[0]
        })
      })
      .then(() => {
        dispatch(SignUpSuccessAC())
      })
      .catch((err: ErrorType) => {
        dispatch(SignUpErrorAC(err))
    })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
      })
  }
}

type ActionType =
  | ReturnType<typeof SignInSuccessAC>
  | ReturnType<typeof SignInErrorAC>
  | ReturnType<typeof SignUpSuccessAC>
  | ReturnType<typeof SignUpErrorAC>

type ErrorType = {
  a: null,
  code: string,
  message: string
}
type NewUserType = {
  email: string,
  password: string,
  firstName: string,
  lastName: string
}
export type AuthReducerType = {
  authError: string | null
}
