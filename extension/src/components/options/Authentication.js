import React from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import LoggedIn from "./LoggedIn";
import { Switch, Route, HashRouter } from "react-router-dom";

class Authentication extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={LoggedIn} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Authentication;
