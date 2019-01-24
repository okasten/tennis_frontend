import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Conversation from "../components/Conversation";
import NewConversationForm from "../components/NewConversationForm";
import { Button } from "react-bootstrap";
import MessageContainer from "./MessageContainer";

class ConversationContainer extends Component {
  state = {
    newConversation: false,
    currentConversation: ""
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

  handleClick = convo => {
    this.setState({
      showMessages: true,
      currentConversation: convo,
      newConversation: false
    });

    this.props.markMessagesRead(convo);
  };

  getConvos = () => {
    if (this.props.conversations) {
      let conversations = this.props.conversations.map(convo => {
        let unreadMessages = convo.messages.filter(message => {
          return !message.read;
        });

        if (unreadMessages.length > 0) {
          return (
            <Conversation
              numUnread={unreadMessages.length}
              key={convo.id}
              convo={convo}
              handleClick={this.handleClick}
            />
          );
        } else {
          return (
            <Conversation
              key={convo.id}
              convo={convo}
              handleClick={this.handleClick}
            />
          );
        }
      });
      return conversations;
    } else {
      return "No conversations yet!";
    }
  };

  newConversation = () => {
    this.setState({
      newConversation: !this.state.newConversation,
      showMessages: false
    });
    let userType = localStorage.getItem("type");
    let type;
    if (userType === "coach") {
      type = "coaches";
    } else {
      type = "players";
    }
    this.props.loadConversations(type, this.props.user);
  };

  unreadMessages = () => {
    if (this.props.unreadMessages === 1) {
      return "You have 1 new message!";
    } else if (this.props.unreadMessages > 1) {
      return `You have ${this.props.unreadMessages} new messages!`;
    }
  };
  render() {
    return (
      <div className="bigBox">
        <div className="inboxHeader">
          <h1>INBOX</h1>
          <h4 className="unreadMessages">
            {this.props.unreadMessages === 0
              ? "You have no new messages!"
              : this.unreadMessages()}
          </h4>
          {this.getConvos()}
          {!this.state.newConversation ? (
            <Button className="newConversation" onClick={this.newConversation}>
              Create A New Message
            </Button>
          ) : null}
        </div>

        {this.state.newConversation ? (
          <div className="newConversationForm">
            <NewConversationForm handleCancel={this.newConversation} />
          </div>
        ) : null}

        {this.state.showMessages ? (
          <div className="messageContainer">
            <MessageContainer convo={this.state.currentConversation} />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    conversations: state.conversations,
    unreadMessages: state.numberUnread
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadConversations: (type, user) =>
      dispatch(actions.loadConversations(type, user)),
    markMessagesRead: convo => dispatch(actions.markMessagesRead(convo))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConversationContainer);
