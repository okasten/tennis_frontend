import React, { Component } from "react";

class StudentGoal extends Component {
  state = {
    showData: false
  };

  handleClick = () => {
    this.setState({
      showData: !this.state.showData
    });
  };

  goalCreatedAt = () => {
    let date = this.props.goal.created_at;
    date = date.slice(0, 10);
    return date;
  };
  render() {
    return (
      <React.Fragment>
        <h3 onClick={this.handleClick}>{this.props.goal.objective}</h3>
        {this.state.showData ? (
          <div className="studentGoalNotes">
            <h4>Date Set: {this.goalCreatedAt()}</h4>
            <h4>Notes: {this.props.goal.notes}</h4>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default StudentGoal;
