import React, { Component } from "react";
import "./App.css";
import Calendar from "./hoc/Calendar/index";
import Month from "./containers/Month";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";
import Header from "./components/Header";
import { connect } from "react-redux";
import LogInForm from "./components/LogInForm";
import { logOutUser, logIn } from "./store/actions";
import CoachCalendars from "./containers/CoachCalendars";
import MessagesPage from "./components/MessagesPage";
import ProfilePage from "./components/ProfilePage";
import Weather from "./components/Weather";
import StudentsPage from "./components/StudentsPage";

class App extends Component {
  state = {
    logIn: false,
    context: "",
    bookLessonsPage: false,
    messagesPage: false,
    profilePage: false,
    studentsPage: false
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
            logIn: false,
            bookLessonsPage: false,
            messagesPage: false
          });
          this.props.logIn(res.user);
        });
    }
  }

  handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("type");

    this.setState({
      logIn: true,
      bookLessonsPage: false,
      messagesPage: false,
      profilePage: false,
      studentsPage: false
    });

    this.props.handleLogOut();
  };

  bookLessonsPage = () => {
    this.setState({
      bookLessonsPage: true,
      messagesPage: false,
      profilePage: false,
      studentsPage: false
    });
  };

  messagesPage = () => {
    this.setState({
      bookLessonsPage: false,
      messagesPage: true,
      profilePage: false,
      studentsPage: false
    });
  };

  profilePage = () => {
    this.setState({
      bookLessonsPage: false,
      messagesPage: false,
      profilePage: true,
      studentsPage: false
    });
  };

  studentsPage = () => {
    this.setState({
      bookLessonsPage: false,
      messagesPage: false,
      profilePage: false,
      studentsPage: true
    });
  };

  tournamentsPage = () => {
    this.setState({
      bookLessonsPage: false,
      messagesPage: false,
      profilePage: false,
      studentsPage: false
    });
  };

  render() {
    let userType = localStorage.getItem("type");
    return (
      <React.Fragment>
        <Header
          handleLogIn={this.handleLogIn}
          user={this.props.user}
          handleLogOut={this.handleLogOut}
          userType={userType}
          bookLessonsPage={this.bookLessonsPage}
          messagesPage={this.messagesPage}
          profilePage={this.profilePage}
          studentsPage={this.studentsPage}
        />

        {this.state.logIn ? (
          <LogInForm
            handleLogIn={this.handleLogIn}
            pullUpForm={this.state.context}
          />
        ) : null}
        {this.state.bookLessonsPage ? (
          <React.Fragment>
            <CoachCalendars />
          </React.Fragment>
        ) : null}
        {this.state.messagesPage ? <MessagesPage /> : null}
        {this.state.profilePage ? <ProfilePage /> : null}
        {this.state.studentsPage ? <StudentsPage /> : null}
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
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
