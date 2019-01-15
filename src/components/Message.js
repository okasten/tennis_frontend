import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <React.Fragment>
        <h4>{this.props.message.subject}</h4>
        <h6>{this.props.message.content}</h6>
      </React.Fragment>
    );
  }
}

export default Message;
