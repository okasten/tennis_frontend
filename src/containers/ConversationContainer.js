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
      currentConversation: convo
    });

    this.props.markMessagesRead(convo);
  };

  getConvos = () => {
    if (this.props.conversations) {
      let conversations = this.props.conversations.map(convo => {
        let unreadMessages = convo.messages.filter(message => {
          return message.unread;
        });
        if (unreadMessages.length > 0) {
          return (
            <strong>
              <Conversation
                key={convo.id}
                convo={convo}
                handleClick={this.handleClick}
              />
            </strong>
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
      newConversation: !this.state.newConversation
    });
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
          {this.state.newConversation ? (
            <NewConversationForm handleCancel={this.newConversation} />
          ) : (
            <Button className="newConversation" onClick={this.newConversation}>
              Create A New Message
            </Button>
          )}
        </div>
        <div className="messageContainer">
          {this.state.showMessages ? (
            <MessageContainer convo={this.state.currentConversation} />
          ) : null}
        </div>
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
