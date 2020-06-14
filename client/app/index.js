import React from "react";
import { render } from "react-dom";

import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import App from "./components/App/App";
import NotFound from "./components/App/NotFound";
import "react-toastify/dist/ReactToastify.css";
import "./styles/styles.scss";
import Contact from "./components/Contact/Contact";

render(
  <Router>
    <App>
      <Switch>
        <Route exact path="/" component={Contact} />

        <Route component={NotFound} />
      </Switch>
    </App>
  </Router>,
  document.getElementById("app")
);
