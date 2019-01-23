import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../store/actions";

class EditGoalForm extends Component {
  componentDidMount() {
    this.props.getGoal(this.props.goal);
  }
  state = {
    goal: {
      objective: this.props.goal.objective,
      notes: this.props.goal.notes
    }
  };

  handleUpdate = () => {
    this.props.updateGoal(this.props.goal, this.state.goal);
    this.props.handleEdit(this.state.goal);
  };

  handleChange = e => {
    this.setState({
      goal: {
        [e.target.name]: e.target.value
      }
    });
  };

  render() {
    return (
      <form className="editGoalForm">
        <h2>
          <label>Objective: </label>
        </h2>
        <input
          className="inputGoal"
          name="objective"
          value={this.state.goal.objective}
          onChange={this.handleChange}
          placeholder={this.props.goal.objective}
        />
        <h2>
          <label>Notes: </label>
        </h2>
        <textarea
          name="notes"
          value={this.state.goal.notes}
          onChange={this.handleChange}
          placeholder={this.props.goal.notes}
        />
        <Button className="send" onClick={this.handleUpdate}>
          Update Goal
        </Button>
        <Button
          bsStyle="danger"
          className="send"
          onClick={this.props.handleEdit}
        >
          Cancel
        </Button>
      </form>
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
    updateGoal: (goal, update) => dispatch(actions.updateGoal(goal, update)),
    getGoal: goal => dispatch(actions.getGoal(goal))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditGoalForm);
