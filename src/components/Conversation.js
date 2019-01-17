import React, { Component } from "react";

class Conversation extends Component {
  render() {
    return (
      <React.Fragment>
        <h3 onClick={() => this.props.handleClick(this.props.convo)}>
          {" "}
          {this.props.convo.player.name} and {this.props.convo.coach.name}{" "}
        </h3>
      </React.Fragment>
    );
  }
}

export default Conversation;
