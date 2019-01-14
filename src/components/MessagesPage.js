import React, { Component } from "react";
import ConversationContainer from "../containers/ConversationContainer";

class MessagesPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>MESSAGES</h1>
        <ConversationContainer />
      </React.Fragment>
    );
  }
}

export default MessagesPage;
