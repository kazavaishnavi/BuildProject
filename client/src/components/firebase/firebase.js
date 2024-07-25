// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDauC5xywKpwLy_WBOj6aaIVr0tAa0z4Rs",
//   authDomain: "oa-virtoffice-project.firebaseapp.com",
//   projectId: "oa-virtoffice-project",
//   storageBucket: "oa-virtoffice-project.appspot.com",
//   messagingSenderId: "416890512159",
//   appId: "1:416890512159:web:59d7b08b2333270e6f062a",
//   measurementId: "G-JDJCEPS4YH"
// };
const firebaseConfig = {
    apiKey: "AIzaSyChOjJhKBSpEdPIK8M4W5u6sO8sFzbr2kA",
    authDomain: "oa-virtoffice-project-e067e.firebaseapp.com",
    projectId:"oa-virtoffice-project-e067e",
    storageBucket:  "oa-virtoffice-project-e067e.appspot.com",
    messagingSenderId:"184286560483",
    appId:"1:184286560483:web:a86c9d7f9b4b858316c5d6",
    measurementId: "G-FZC4M1ZJ3S",
    databaseURL: "https://oa-virtoffice-project-e067e-default-rtdb.firebaseio.com/",
  };

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(firebaseApp);
