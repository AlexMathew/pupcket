import React from "react";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "./firebase";

class FirebaseAuth extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: (authResult) => {
        console.log(authResult.user.toJSON());
      },
    },
  };

  render() {
    return <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />;
  }
}

export default FirebaseAuth;
