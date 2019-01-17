import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions";

class GoalInformation extends Component {
  state = {
    editGoal: false,
    goal: {
      objective: this.props.goal.objective,
      notes: this.props.goal.notes
    }
  };
  goalCreatedAt = () => {
    let date = this.props.goal.created_at;
    date = date.slice(0, 10);
    return date;
  };

  handleClick = () => {
    this.setState({
      editGoal: !this.state.editGoal
    });
  };

  handleChange = e => {
    this.setState({
      goal: {
        [e.target.name]: e.target.value
      }
    });
  };

  handleUpdate = () => {
    this.props.updateGoal(this.props.goal, this.state.goal);
    this.setState({
      editGoal: false
    });
  };

  deleteGoal = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      this.props.deleteGoal(this.props.goal);

      this.props.handleShow();
    }
  };
  render() {
    return (
      <React.Fragment>
        {!this.state.editGoal ? (
          <React.Fragment>
            <h3>{this.state.goal.objective}</h3>
            <h4>Date Set: {this.goalCreatedAt()}</h4>
            <h4>{this.state.goal.notes}</h4>

            <Button onClick={this.handleClick}>Edit Goal</Button>
            <Button onClick={this.deleteGoal}>Delete Goal</Button>
          </React.Fragment>
        ) : (
          <form>
            <label>Objective: </label>
            <input
              name="objective"
              value={this.state.goal.objective}
              onChange={this.handleChange}
              placeholder={this.state.goal.objective}
            />
            <label>Notes: </label>
            <input
              name="notes"
              value={this.state.goal.notes}
              onChange={this.handleChange}
              placeholder={this.state.goal.notes}
            />
            <Button onClick={this.handleUpdate}>Update Goal</Button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateGoal: (goal, update) => dispatch(actions.updateGoal(goal, update)),
    deleteGoal: goal => dispatch(actions.deleteGoal(goal))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GoalInformation);
