import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {rrfConfig, rrfProps, store} from "./store/store";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import AuthIsInitialized from "./helpers/AuthIsInitialized";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps} config={rrfConfig}>
        <AuthIsInitialized>
          <App/>
        </AuthIsInitialized>
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
