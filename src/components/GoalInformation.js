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

  shouldComponentUpdate(nextProps) {
    if (
      nextProps !== this.props ||
      !this.state.editGoal ||
      this.props.goal !== this.state.goal ||
      this.state.editGoal ||
      this.props.goals !== nextProps
    ) {
      return true;
    } else {
      return false;
    }
  }
  goalCreatedAt = () => {
    let date = this.props.goal.created_at;
    date = date.slice(0, 10);
    return date;
  };

  handleClick = () => {
    this.setState({
      editGoal: !this.state.editGoal,
      goal: {
        objective: this.props.goal.objective,
        notes: this.props.goal.notes
      }
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
      editGoal: false,
      goal: {
        objective: this.props.goal.objective,
        notes: this.props.goal.notes
      }
    });
  };

  deleteGoal = () => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      this.props.deleteGoal(this.props.goal);

      this.props.handleShow();
    }
  };

  meetGoal = () => {
    this.props.meetGoal(this.props.goal);
    this.props.handleShow();
  };

  render() {
    console.log("PROPS", this.props.goal);
    console.log("STATE", this.state.goal);

    return (
      <React.Fragment>
        {!this.state.editGoal ? (
          <React.Fragment>
            <h3>{this.props.goal.objective}</h3>
            <h4>Date Set: {this.goalCreatedAt()}</h4>
            <h4>{this.props.goal.notes}</h4>

            {!this.props.goal.met ? (
              <React.Fragment>
                <Button onClick={this.handleClick}>Edit Goal</Button>
                <Button onClick={this.meetGoal}>Meet Goal</Button>{" "}
              </React.Fragment>
            ) : null}
            <Button onClick={this.deleteGoal}>Delete Goal</Button>
          </React.Fragment>
        ) : (
          <form>
            <label>Objective: </label>
            <input
              name="objective"
              value={this.state.goal.objective}
              onChange={this.handleChange}
              placeholder={this.props.goal.objective}
            />
            <label>Notes: </label>
            <textarea
              name="notes"
              value={this.state.goal.notes}
              onChange={this.handleChange}
              placeholder={this.props.goal.notes}
            />
            <Button onClick={this.handleUpdate}>Update Goal</Button>
          </form>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    goals: state.goals,
    theGoal: state.goal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGoal: (goal, update) => dispatch(actions.updateGoal(goal, update)),
    deleteGoal: goal => dispatch(actions.deleteGoal(goal)),
    meetGoal: goal => dispatch(actions.meetGoal(goal)),
    getGoal: goal => dispatch(actions.getGoal(goal))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(GoalInformation);
