import firebase from "firebase/app";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
auth.useDeviceLanguage();

export { auth };
export default firebase;
