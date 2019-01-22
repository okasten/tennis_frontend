import React, { Component } from "react";

class Conversation extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.numUnread > 0 ? (
          <h3
            className="strongUnread"
            onClick={() => this.props.handleClick(this.props.convo)}
          >
            {" "}
            {this.props.convo.player.name} and {this.props.convo.coach.name}{" "}
          </h3>
        ) : (
          <h3 onClick={() => this.props.handleClick(this.props.convo)}>
            {" "}
            {this.props.convo.player.name} and {this.props.convo.coach.name}{" "}
          </h3>
        )}
      </React.Fragment>
    );
  }
}

export default Conversation;
