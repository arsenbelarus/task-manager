import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import {getFirebase, firebaseReducer} from 'react-redux-firebase';
import {getFirestore, firestoreReducer, reduxFirestore, createFirestoreInstance} from 'redux-firestore';
import {authReducer} from "./reducers/authReducer";
import {projectReducer} from "./reducers/projectReducer";
import firebase, {firebaseConfig} from "./../config/firebaseConfig";
import {appStatusReducer} from "./reducers/appStatusReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  appStatus: appStatusReducer,
})



export const store = createStore(
  rootReducer,
  compose(
    // @ts-ignore
    reduxFirestore(firebase, firebaseConfig),
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
  ),
);

export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true,
  attachAuthIsReady: true,
}

export const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
  useFirestoreForProfile: true,
  userProfile: "users",
  attachAuthIsReady: true,
};

// @ts-ignore
window.store = store;

export type AppRootStateType = ReturnType<typeof rootReducer>