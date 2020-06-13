import React from "react";
import AuthSection from "./AuthSection";
import LoggedIn from "./LoggedIn";
import { AUTH_TOKEN_FIELD } from "../../constants";

class Authentication extends React.Component {
  state = {
    authenticated: false,
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (token) => {
      if (token !== undefined && token.auth_token !== null) {
        this.setState({ authenticated: true });
      }
    });
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated) {
      return <LoggedIn />;
    } else {
      return <AuthSection />;
    }
  }
}

export default Authentication;
