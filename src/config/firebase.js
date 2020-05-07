import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDH8iuOBxi98D7Ybs1cjiw98hiethHdbzg",
    authDomain: "msgfirebaseproject-bc593.firebaseapp.com",
    databaseURL: "https://msgfirebaseproject-bc593.firebaseio.com",
    projectId: "msgfirebaseproject-bc593",
    storageBucket: "msgfirebaseproject-bc593.appspot.com",
    messagingSenderId: "248193378943",
    appId: "1:248193378943:web:06c932044521545ba96d4a"
  };
  // Initialize Firebase
  var app=firebase.initializeApp(firebaseConfig);

  export var db = app.firestore();
  export var users = db.collection('users');