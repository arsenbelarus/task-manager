import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import {getFirebase, firebaseReducer} from 'react-redux-firebase';
import {getFirestore, firestoreReducer, reduxFirestore} from 'redux-firestore';
import {authReducer} from "./reducers/authReducer";
import {projectReducer} from "./reducers/projectReducer";
import firebase, {firebaseConfig} from "./../config/firebaseConfig";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
})



export const store = createStore(
  rootReducer,
  compose(
    // @ts-ignore
    reduxFirestore(firebase, firebaseConfig),
    applyMiddleware(thunk.withExtraArgument({ getFirestore, getFirebase })),
  ),
);

/*
export const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true
}
*/

/*export const rrfProps = {
  firebase,
  config: firebaseConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};*/

export type AppRootStateType = ReturnType<typeof rootReducer>