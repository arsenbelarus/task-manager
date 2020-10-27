import {applyMiddleware, combineReducers, createStore } from "redux";
import thunk from 'redux-thunk';
import {authReducer} from "./reducers/authReducer";
import {projectReducer} from "./reducers/projectReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type AppRootStateType = ReturnType<typeof rootReducer>