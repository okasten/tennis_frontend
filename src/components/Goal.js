import React, { Component } from "react";

class Goal extends Component {
  render() {
    return (
      <h3 onClick={() => this.props.handleClick(this.props.goal)}>
        {" "}
        {this.props.goal.objective}{" "}
      </h3>
    );
  }
}

export default Goal;
