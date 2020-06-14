import React from "react";
import AuthSection from "./AuthSection";
import LoggedIn from "./LoggedIn";
import { AUTH_TOKEN_FIELD } from "../../constants";

class Authentication extends React.Component {
  state = {
    authenticated: false,
    username: "",
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (result !== undefined && token.auth_token !== null) {
        this.setState({ authenticated: true, username: token.username });
      }
    });
  }

  render() {
    const { authenticated } = this.state;

    if (authenticated) {
      return <LoggedIn username={this.state.username} />;
    } else {
      return <AuthSection />;
    }
  }
}

export default Authentication;
