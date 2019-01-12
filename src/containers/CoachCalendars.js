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
    filteredSearch: ""
  };

  componentDidMount() {
    console.log("GET COACHES");
    this.props.getCoaches();
    this.setState({
      filteredSearch: this.props.coaches
    });
  }

  handleChange = e => {
    let newArray = this.props.coaches.filter(coach => {
      coach.name.includes(this.state.search);
    });

    this.setState({
      search: e.target.value,
      filteredSearch: newArray
    });
  };

  chooseCoach = coach => {
    console.log(coach);
    this.props.loadLessons(coach);
  };
  render() {
    console.log(this.state);
    let coaches = [];
    if (this.props.coaches) {
      coaches = this.props.coaches.map(coach => {
        return (
          <ListGroupItem onClick={() => this.chooseCoach(coach)}>
            {coach.name}
          </ListGroupItem>
        );
      });
    }

    return (
      <React.Fragment>
        <ControlLabel>Search Coaches</ControlLabel>
        <input
          onChange={this.handleChange}
          type="text"
          placeholder="Find A Coach"
          value={this.state.search}
          name="search"
        />
        <ListGroup>{coaches}</ListGroup>
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
  console.log(state);
  return {
    coaches: state.coaches
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
