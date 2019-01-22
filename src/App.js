import React, { Component } from "react";
import "./App.css";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import { connect } from "react-redux";
import LogInForm from "./components/LogInForm";
import * as actions from "./store/actions";
import CoachCalendars from "./containers/CoachCalendars";
import MessagesPage from "./components/MessagesPage";
import ProfilePage from "./components/ProfilePage";
import StudentsPage from "./components/StudentsPage";
import GoalsContainer from "./containers/GoalsContainer";
import LessonsContainer from "./containers/LessonsContainer";
import HomePage from "./components/HomePage";
import video from "./images/BEST TENNIS SHOTS EVER (my favorites) Part 1 [HD].mp4";
import { Button } from "react-bootstrap";

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
          if (this.props.user) {
            this.props.getUnreadMessages(res.user, type);
          }
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
    let userType = localStorage.getItem("type");
    return (
      <React.Fragment>
        <video className="myVideo" loop autoPlay muted>
          <source src={video} type="video/mp4" />
          <source src={video} type="video/ogg" />
          Your browser does not support the video tag.
        </video>

        <Header
          handleLogIn={this.handleLogIn}
          user={this.props.user}
          handleLogOut={this.handleLogOut}
          userType={userType}
          unreadMessages={this.props.numberUnread}
        />
        <Switch>
          <Route path="/inbox" component={MessagesPage} />
          <Route path="/calendar" component={CoachCalendars} />
          <Route path="/profile" component={ProfilePage} />
          <Route path="/students" component={StudentsPage} />
          <Route path="/goals" component={GoalsContainer} />
          <Route path="/lessons" component={LessonsContainer} />

          <Route path="/" exact component={HomePage} />
        </Switch>
        {this.state.logIn ? (
          <LogInForm
            handleLogIn={this.handleLogIn}
            pullUpForm={this.state.context}
          />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    numberUnread: state.numberUnread
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logIn: user => dispatch(actions.logIn(user)),
    handleLogOut: () => dispatch(actions.logOutUser()),
    getUnreadMessages: (user, type) =>
      dispatch(actions.getUnreadMessages(user, type))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
