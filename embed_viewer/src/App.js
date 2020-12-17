import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Twitter from "./Twitter";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/twitter" component={Twitter} />
      </Switch>
    </BrowserRouter>
  );
}
