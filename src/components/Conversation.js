import React, { Component } from "react";
import MessageContainer from "../containers/MessageContainer";

class Conversation extends Component {
  state = {
    showMessages: false
  };

  handleMessages = () => {
    this.setState({
      showMessages: !this.state.showMessages
    });
  };
  render() {
    console.log(this.props.convo);
    return (
      <React.Fragment>
        <h3 onClick={this.handleMessages}>
          {" "}
          {this.props.convo.player.name} and {this.props.convo.coach.name}{" "}
        </h3>
        {this.state.showMessages ? (
          <MessageContainer convo={this.props.convo} />
        ) : null}
      </React.Fragment>
    );
  }
}

export default Conversation;
