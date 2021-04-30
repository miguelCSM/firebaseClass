import firebase from "firebase/app"

const firebaseConfig = {
    apiKey: "AIzaSyCqP9DgKFPLMumqZEWXA55obTwDMoFOAsk",
    authDomain: "fir-app-aa22f.firebaseapp.com",
    projectId: "fir-app-aa22f",
    storageBucket: "fir-app-aa22f.appspot.com",
    messagingSenderId: "751266836940",
    appId: "1:751266836940:web:7e7f9d69316959b0bead69"
  };

export default firebase.initializeApp(firebaseConfig)