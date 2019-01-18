import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import EditGoalForm from "./EditGoalForm";

class GoalInformation extends Component {
  state = {
    editGoal: false
  };
  componentDidMount() {
    this.props.getGoal(this.props.goal);
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.theGoal) {
      if (nextProps.theGoal !== this.props.theGoal || !this.state.editGoal) {
        return true;
      } else {
        return false;
      }
    }
  }
  goalCreatedAt = () => {
    let date = this.props.goal.created_at;
    date = date.slice(0, 10);
    return date;
  };

  goalMetAt = () => {
    let date = this.props.goal.updated_at;
    date = date.slice(0, 10);
    return date;
  };

  handleClick = () => {
    this.setState({
      editGoal: !this.state.editGoal
    });
  };

  handleEdit = goal => {
    let newGoal = { ...this.props.goal, ...goal };
    this.props.getGoal(newGoal);
    this.setState({
      editGoal: !this.state.editGoal
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
    return (
      <React.Fragment>
        {!this.state.editGoal ? (
          <React.Fragment>
            <h3>Goal: </h3>
            <h4>{this.props.goal.objective}</h4>
            <h4>Date Set: </h4>
            <h5>{this.goalCreatedAt()}</h5>
            {this.props.goal.met ? (
              <React.Fragment>
                <h4>Date Met: </h4>
                <h5>{this.goalMetAt()}</h5>
              </React.Fragment>
            ) : null}
            <h4>Notes: </h4>
            <h5>{this.props.goal.notes}</h5>

            {!this.props.goal.met ? (
              <React.Fragment>
                <Button onClick={this.handleClick}>Edit Goal</Button>
                <Button onClick={this.meetGoal}>Meet Goal</Button>{" "}
              </React.Fragment>
            ) : null}
            <Button onClick={this.deleteGoal}>Delete Goal</Button>
          </React.Fragment>
        ) : (
          <EditGoalForm
            goal={this.props.goal}
            handleEdit={this.handleEdit}
            handleClose={this.handleClick}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    theGoal: state.goal
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteGoal: goal => dispatch(actions.deleteGoal(goal)),
    meetGoal: goal => dispatch(actions.meetGoal(goal)),
    getGoal: goal => dispatch(actions.gettingGoal(goal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoalInformation);
