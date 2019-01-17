import React, { Component } from "react";
import MessageContainer from "../containers/MessageContainer";

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
