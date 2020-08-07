import React from "react";
import './App.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  // Link
} from "react-router-dom";

// Pages
import SearchPage from "./pages/index";
import SavePage from "./pages/Save";
import NotFound from "./pages/404";

const App = () => {
  // render() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SearchPage} />
        <Route exact path="/save" component={SavePage} />
        <Route exact path="/404" component={NotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  )
}

export default App;
