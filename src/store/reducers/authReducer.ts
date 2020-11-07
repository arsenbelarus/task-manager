import {Dispatch} from "react";
import {authFirebase, projectFirestore} from "../../config/firebaseConfig";
import {toggleLoadingAC} from "./appStatusReducer";
import {toast} from "react-toastify";

const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
const SIGNIN_ERROR = "SIGNIN_ERROR";
const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
const SIGNUP_ERROR = "SIGNUP_ERROR";

const initState = {
  authError: null,
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

//THUNKS
export const signIn = (credentials: { email: string, password: string }) => {
  return (dispatch: Dispatch<any>) => {
    dispatch(toggleLoadingAC(true))
    authFirebase.signInWithEmailAndPassword(credentials.email, credentials.password)
      .then((res) => {
        dispatch(SignInSuccessAC())
        toast.info(`User with email: ${res.user?.email} has signed in`)
      })
      .catch((err: ErrorType) => {
      dispatch(SignInErrorAC(err))
        toast.error(err.message)
    })
      .finally(() => {
        dispatch(toggleLoadingAC(false))
      })
  }
}
export const signOut = (email: string | null) => {
  return (dispatch: Dispatch<any>) => {
    authFirebase.signOut()
      .then((res) => {
        toast.info(`User with email: ${email} has signed out`)
      }).catch((err: ErrorType) => {
      toast.error(err.message)
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
      .then((res) => {
        toast.success(`User with email ${newUser.email} has been added`)
        dispatch(SignUpSuccessAC())
      })
      .catch((err: ErrorType) => {
        dispatch(SignUpErrorAC(err))
        toast.error(err.message)
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
