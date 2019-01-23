import React, { Component } from "react";
import StudentGoal from "../components/StudentGoal";
import { Button } from "react-bootstrap";
class IndividualStudent extends Component {
  state = {
    short: false,
    long: false
  };
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

  showShort = () => {
    this.setState({
      short: !this.state.short,
      long: false
    });
  };

  showLong = () => {
    this.setState({
      short: false,
      long: !this.state.long
    });
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
        <Button className="goalButtons" onClick={this.showShort}>
          View Short-Term Goals
        </Button>
        <Button className="goalButtons" onClick={this.showLong}>
          View Long-Term Goals
        </Button>
        {this.state.short ? (
          <div>
            <h2 className="playerGoalsHeader">Short-Term Goals </h2>
            <h3 className="playerGoals">{this.getShortGoals()}</h3>
          </div>
        ) : null}
        {this.state.long ? (
          <div>
            <h2 className="playerGoalsHeader">Long-Term Goals</h2>
            <h3 className="playerGoals"> {this.getLongGoals()}</h3>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IndividualStudent;
