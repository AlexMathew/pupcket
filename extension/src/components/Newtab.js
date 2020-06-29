import React from "react";
import { AUTH_TOKEN_FIELD } from "../constants";
import NewtabMoment from "./newtab/NewtabMoment";
import NotAuthenticated from "./newtab/NotAuthenticated";

class Newtab extends React.Component {
  state = {
    authenticated: true,
  };

  componentDidMount() {
    chrome.storage.local.get([AUTH_TOKEN_FIELD], (result) => {
      const token = result[[AUTH_TOKEN_FIELD]];
      if (token === undefined || token.auth_token === null) {
        this.setState({ authenticated: false });
      }
    });
  }

  render() {
    if (this.state.authenticated) {
      return <NewtabMoment />;
    }

    return <NotAuthenticated />;
  }
}

export default Newtab;
