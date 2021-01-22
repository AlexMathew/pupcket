import React from "react";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import { Switch, Route, HashRouter } from "react-router-dom";

class Authentication extends React.Component {
  render() {
    return (
      <HashRouter>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/signin" component={SignIn} />
        </Switch>
      </HashRouter>
    );
  }
}

export default Authentication;
