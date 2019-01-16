import React, { Component } from "react";
import Calendar from "../hoc/Calendar/index";
import Month from "./Month";
import { withRouter, Route, Switch, HashRouter } from "react-router-dom";
import {
  FormGroup,
  ControlLabel,
  FormControl,
  ListGroup,
  ListGroupItem
} from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Weather from "../components/Weather";
import TodayLessonsContainer from "./TodayLessonsContainer";

class CoachCalendars extends Component {
  state = {
    search: "",
    filteredSearch: []
  };

  componentDidMount() {
    console.log("GET COACHES");
    this.props.getCoaches();
  }

  geoSuccess = position => {
    let location;
  };

  chooseCoach = e => {
    this.props.loadLessons(e.target.value);
  };

  render() {
    let userType = localStorage.getItem("type");
    let coaches = [];

    if (this.props.coaches) {
      coaches = this.props.coaches.map(coach => {
        return <option value={coach.id}>{coach.name}</option>;
      });
    }

    return (
      <React.Fragment>
        <Weather />
        <br />
        {userType !== "coach" ? (
          <React.Fragment>
            <label>Select a coach to view their calendar</label>
            <select onChange={this.chooseCoach}>
              <option>Select</option>
              {coaches}
            </select>
          </React.Fragment>
        ) : (
          this.props.loadLessons(this.props.user.id)
        )}
        <Calendar>
          <HashRouter>
            <Switch>
              <Route path="/:year/:month" component={Month} />
              <Route path="/" exact component={Month} />
            </Switch>
          </HashRouter>
        </Calendar>
        {userType === "coach" ? <TodayLessonsContainer /> : null}
      </React.Fragment>
    );
  }
}
const mapStateToProps = state => {
  return {
    coaches: state.coaches,
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCoaches: () => {
      dispatch(actions.getCoaches());
    },
    loadLessons: coach => {
      dispatch(actions.loadLessons(coach));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoachCalendars);
