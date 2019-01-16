import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Conversation from "../components/Conversation";
import NewConversationForm from "../components/NewConversationForm";
import { Button } from "react-bootstrap";
let count = 0;
class ConversationContainer extends Component {
  state = {
    newConversation: false
  };
  componentDidMount() {
    let userType = localStorage.getItem("type");
    let type;
    if (userType === "coach") {
      type = "coaches";
    } else {
      type = "players";
    }
    this.props.loadConversations(type, this.props.user);
  }

  getConvos = () => {
    if (this.props.conversations) {
      let conversations = this.props.conversations.map(convo => {
        return <Conversation convo={convo} />;
      });
      return conversations;
    } else {
      return "No conversations yet!";
    }
  };

  newConversation = () => {
    this.setState({
      newConversation: !this.state.newConversation
    });
  };
  render() {
    console.log(this.props.conversations);
    return (
      <React.Fragment>
        <h1>Conversations</h1>
        {this.getConvos()}
        {this.state.newConversation ? (
          <NewConversationForm />
        ) : (
          <Button onClick={this.newConversation}>Compose a Message</Button>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    conversations: state.conversations
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadConversations: (type, user) =>
      dispatch(actions.loadConversations(type, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationContainer);
