import React from "react";
import AuthSection from "./AuthSection";
import LoggedIn from "./LoggedIn";
import {
  AUTH_TOKEN_FIELD,
  MOMENTS_STORAGE_FIELD,
  MOMENTS_COUNT_FIELD,
} from "../../constants";
import { fetchMoments } from "../../utils/pupcket";

class Authentication extends React.Component {
  state = {
    authenticated: false,
    username: "",
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token !== undefined && token.auth_token !== null) {
        this.setState({ authenticated: true, username: token.username });
      }
    });
  }

  login = ({ auth_token, username }) => {
    chrome.storage.local.set({
      [AUTH_TOKEN_FIELD]: { auth_token, username },
    });
    this.setState({ authenticated: true, username: username });
    fetchMoments();
  };

  logout = () => {
    chrome.storage.local.remove([
      AUTH_TOKEN_FIELD,
      MOMENTS_STORAGE_FIELD,
      MOMENTS_COUNT_FIELD,
    ]);
    this.setState({ authenticated: false, username: "" });
  };

  render() {
    const { authenticated } = this.state;

    if (authenticated) {
      return <LoggedIn username={this.state.username} logout={this.logout} />;
    } else {
      return <AuthSection login={this.login} />;
    }
  }
}

export default Authentication;
