import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Message from "../components/Message";
import { Button } from "react-bootstrap";

class MessageContainer extends Component {
  state = {
    reply: false,
    content: "Reply..."
  };
  componentDidMount() {
    this.props.getMessages(this.props.user, this.props.convo);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.messages) {
      if (
        nextProps.convo !== this.props.convo ||
        nextProps.messages.length !== this.props.messages.length
      ) {
        this.props.getMessages(nextProps.user, nextProps.convo);
      }
    }
  }

  showMessages = () => {
    let messages;
    if (this.props.messages) {
      messages = this.props.messages.map(message => {
        return <Message key={message.id} message={message} />;
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

    this.setState({
      reply: !this.state.reply,
      content: "Reply..."
    });
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
                className="replyForm"
              />
            </form>
            <Button className="send" onClick={this.sendReply}>
              Send
            </Button>
            <Button
              className="send"
              bsStyle="danger"
              onClick={this.handleReply}
            >
              {" "}
              Cancel
            </Button>
          </React.Fragment>
        ) : (
          <Button className="reply" onClick={this.handleReply}>
            Reply
          </Button>
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
