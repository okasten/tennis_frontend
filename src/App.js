import React, { Component } from "react";
import "./App.css";
import Calendar from "./hoc/Calendar/index";
import Month from "./containers/Month";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Calendar>
        <HashRouter>
          <Switch>
            <Route path="/:year/:month" component={Month} />
            <Route path="/" exact component={Month} />
          </Switch>
        </HashRouter>
      </Calendar>
    );
  }
}

export default withRouter(App);
