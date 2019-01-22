import React, { Component } from "react";

class Message extends Component {
  render() {
    return (
      <div className="message">
        {!this.props.message.read ? (
          <React.Fragment>
            {this.props.message.to !== null ? (
              <h4>To: {this.props.message.to}</h4>
            ) : null}
            <h4>From: {this.props.message.from}</h4>

            <h4>Subject: {this.props.message.subject}</h4>
            <h3 className="messageContent">{this.props.message.content}</h3>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {this.props.message.to !== null ? (
              <h4>To: {this.props.message.to}</h4>
            ) : null}
            <h4>From: {this.props.message.from}</h4>

            <h4>Subject: {this.props.message.subject}</h4>
            <h6 className="messageContent">{this.props.message.content}</h6>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Message;
