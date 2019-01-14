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

class CoachCalendars extends Component {
  state = {
    search: "",
    filteredSearch: []
  };

  componentDidMount() {
    console.log("GET COACHES");
    this.props.getCoaches();
  }

  chooseCoach = coach => {
    this.props.loadLessons(coach);
  };

  render() {
    let userType = localStorage.getItem("type");
    let coaches = [];

    if (this.props.coaches) {
      coaches = this.props.coaches.map(coach => {
        return (
          <ListGroupItem
            key={coach}
            value={coach}
            onClick={() => this.chooseCoach(coach)}
          >
            {coach.name}
          </ListGroupItem>
        );
      });
    }

    return (
      <React.Fragment>
        {userType !== "coach" ? (
          <React.Fragment>
            <label>Search Coaches</label>
            <ListGroup>{coaches}</ListGroup>
          </React.Fragment>
        ) : (
          this.chooseCoach(this.props.user)
        )}

        <Calendar>
          <HashRouter>
            <Switch>
              <Route path="/:year/:month" component={Month} />
              <Route path="/" exact component={Month} />
            </Switch>
          </HashRouter>
        </Calendar>
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
