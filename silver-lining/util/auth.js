import axios from "axios";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

function createUser() {


 createUserWithEmailAndPassword(auth, "goofyjinkin@gmail.com", "Hexafluoride")
     .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      // ...
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
     });

}