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
            <h1 className="goalFormHeader">{this.props.goal.objective}</h1>
            <span>
              <h2>Date Set: {this.goalCreatedAt()}</h2>
            </span>
            {this.props.goal.met ? (
              <React.Fragment>
                <span>
                  <h2>Date Met: {this.goalMetAt()}</h2>
                </span>
              </React.Fragment>
            ) : null}
            <h2>Notes: </h2>
            <h3>{this.props.goal.notes}</h3>

            {!this.props.goal.met ? (
              <React.Fragment>
                <Button className="goalInfoButton" onClick={this.handleClick}>
                  Edit Goal
                </Button>
                <Button className="goalInfoButton" onClick={this.meetGoal}>
                  Meet Goal
                </Button>
                <Button
                  className="goalInfoButton"
                  bsStyle="danger"
                  onClick={this.deleteGoal}
                >
                  Delete Goal
                </Button>{" "}
              </React.Fragment>
            ) : (
              <Button
                className="goalInfoDeleteButton"
                bsStyle="danger"
                onClick={this.deleteGoal}
              >
                Delete Goal
              </Button>
            )}
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
