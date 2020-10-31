import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Your web app's Firebase configuration
export const firebaseConfig = {
   apiKey: "AIzaSyAoiQDQ0uj3l1_XZbRlBarC-qk-IECqfYo",
   authDomain: "task-manager-arsen.firebaseapp.com",
   databaseURL: "https://task-manager-arsen.firebaseio.com",
   projectId: "task-manager-arsen",
   storageBucket: "task-manager-arsen.appspot.com",
   messagingSenderId: "591272411109",
   appId: "1:591272411109:web:4d85f1afa58b4bd614b90c",
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const projectFirestore = firebase.firestore();
export const authFirebase = firebase.auth()
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export default firebase
