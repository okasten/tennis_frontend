import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.message.read === false ? (
          <strong>
            <h4>{this.props.message.subject}</h4>
            <h1>{this.props.message.content}</h1>
          </strong>
        ) : (
          <React.Fragment>
            <h4>{this.props.message.subject}</h4>
            <h6>{this.props.message.content}</h6>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Message;
