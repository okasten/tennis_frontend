import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.message.read ? (
          <strong>
            {this.props.message.to !== null ? (
              <h3>To: {this.props.message.to}</h3>
            ) : null}
            <h3>From: {this.props.message.from}</h3>

            <h4>{this.props.message.subject}</h4>
            <h1>{this.props.message.content}</h1>
          </strong>
        ) : (
          <React.Fragment>
            {this.props.message.to !== null ? (
              <h3>To: {this.props.message.to}</h3>
            ) : null}
            <h3>From: {this.props.message.from}</h3>

            <h4>{this.props.message.subject}</h4>
            <h6>{this.props.message.content}</h6>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

export default Message;
