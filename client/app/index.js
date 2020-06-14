import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";
import "./styles/styles.scss";
import Timeline from "./components/TimeLine";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Timeline} />

        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
