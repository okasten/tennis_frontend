import React, { Component } from "react";
import StudentGoal from "../components/StudentGoal";

class IndividualStudent extends Component {
  getShortGoals = () => {
    let shortGoals = this.props.student.goals.filter(
      goal => goal.kind === "Short-Term"
    );

    shortGoals = shortGoals.map(goal => <StudentGoal goal={goal} />);
    return shortGoals;
  };
  getLongGoals = () => {
    let longGoals = this.props.student.goals.filter(
      goal => goal.kind === "Long-Term"
    );

    longGoals = longGoals.map(goal => <StudentGoal goal={goal} />);
    return longGoals;
  };

  render() {
    return (
      <React.Fragment>
        <h1>{this.props.student.name}</h1>
        <img src={this.props.student.picture} alt="student profile" />
        <h3>Username: {this.props.student.username}</h3>
        <h3>Email: {this.props.student.email}</h3>
        <h3>Age: {this.props.student.age} </h3>
        <h3>Level: {this.props.student.level} </h3>
        <h2>Short-Term Goals: {this.getShortGoals()}</h2>
        <h2>Long-Term Goals: {this.getLongGoals()}</h2>
      </React.Fragment>
    );
  }
}

export default IndividualStudent;
