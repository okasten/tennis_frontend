import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Message from "../components/Message";
import { Button } from "react-bootstrap";

class MessageContainer extends Component {
  state = {
    reply: false,
    content: ""
  };
  componentDidMount() {
    this.props.getMessages(this.props.user, this.props.convo);
  }

  showMessages = () => {
    let messages;
    if (this.props.messages) {
      messages = this.props.messages.map(message => {
        return <Message message={message} />;
      });
    }
    return messages;
  };

  handleChange = e => {
    this.setState({
      content: e.target.value
    });
  };

  handleReply = () => {
    this.setState({
      reply: !this.state.reply
    });
  };

  sendReply = () => {
    this.props.sendReply(
      localStorage.getItem("type"),
      this.props.user,
      this.props.convo,
      this.state.content
    );
  };

  render() {
    return (
      <React.Fragment>
        <h2>Messages</h2>
        {this.showMessages()}
        {this.state.reply ? (
          <React.Fragment>
            <form>
              <textarea
                name="content"
                value={this.state.content}
                placeholder="Reply..."
                onChange={this.handleChange}
              />
            </form>
            <Button onClick={this.sendReply}>Send</Button>
          </React.Fragment>
        ) : (
          <Button onClick={this.handleReply}>Reply</Button>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    messages: state.messages
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMessages: (user, conversation) =>
      dispatch(actions.getMessages(user, conversation)),
    sendReply: (type, user, conversation, messageContent) => {
      dispatch(actions.sendReply(type, user, conversation, messageContent));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageContainer);
