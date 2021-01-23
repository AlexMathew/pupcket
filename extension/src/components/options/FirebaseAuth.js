import React from "react";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase, { auth } from "./firebase";
import pupcket from "../../api/pupcket";
import { AUTH_TOKEN_FIELD } from "../../constants";
import { fetchMoments } from "../../utils/pupcket";

class FirebaseAuth extends React.Component {
  uiConfig = {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: async (authResult) => {
        const user = authResult.user.toJSON();
        const payload = {
          ...user.providerData[0],
          firebaseUid: user.uid,
        };
        const response = await pupcket.post("/social/auth/", payload);
        chrome.storage.local.set({
          [AUTH_TOKEN_FIELD]: { ...response.data },
        });
        this.props.history.push("/");
        fetchMoments();
      },
    },
  };

  render() {
    return <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />;
  }
}

export default FirebaseAuth;
