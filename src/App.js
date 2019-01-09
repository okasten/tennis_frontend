import React, { Component } from "react";
import "./App.css";
import Calendar from "./hoc/Calendar/index";
import Month from "./containers/Month";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import { connect } from "react-redux";
import LogInForm from "./components/LogInForm";

class App extends Component {
  state = {
    logIn: false,
    context: ""
  };
  handleLogIn = context => {
    this.setState({
      logIn: !this.state.logIn,
      context: context
    });
  };
  render() {
    return (
      <React.Fragment>
        <Header handleLogIn={this.handleLogIn} />
        {this.state.logIn ? <LogInForm context={this.state.context} /> : null}
        {this.props.user ? (
          <Calendar>
            <HashRouter>
              <Switch>
                <Route path="/:year/:month" component={Month} />
                <Route path="/" exact component={Month} />
              </Switch>
            </HashRouter>
          </Calendar>
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(withRouter(App));
