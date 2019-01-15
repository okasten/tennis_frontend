import React, { Component } from "react";

class Conversation extends Component {
  render() {
    console.log(this.props.convo);
    return (
      <h3>
        {" "}
        {this.props.convo.player.name} and {this.props.convo.coach.name}{" "}
      </h3>
    );
  }
}

export default Conversation;
