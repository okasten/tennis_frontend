import React, { Component } from "react";
import "./App.css";
import Calendar from "./hoc/Calendar/index";
import Month from "./containers/Month";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import { connect } from "react-redux";
import LogInForm from "./components/LogInForm";
import { logOutUser, logIn } from "./store/actions";

class App extends Component {
  state = {
    logIn: false,
    context: ""
  };
  handleLogIn = (context, user = null) => {
    this.setState({
      logIn: !this.state.logIn,
      context: context
      // user: user
    });
  };

  componentDidMount() {
    if (localStorage.length > 0) {
      let token = localStorage.getItem("token");
      let type = localStorage.getItem("type");
      fetch(`http://localhost:3000/api/v1/${type}profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Action: "application/json",
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(res => {
          this.setState({
            logIn: false
          });
          this.props.logIn(res.user);
        });
    }
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");
    this.setState({
      logIn: true
    });

    this.props.handleLogOut();
  };

  render() {
    return (
      <React.Fragment>
        <Header
          handleLogIn={this.handleLogIn}
          user={this.props.user}
          handleLogOut={this.handleLogOut}
        />
        {this.state.logIn ? (
          <LogInForm
            handleLogIn={this.handleLogIn}
            pullUpForm={this.state.context}
          />
        ) : null}
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

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(logIn(user)),
    handleLogOut: () => dispatch(logOutUser())
  };
};
// export default withRouter(App);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(App));
