import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Form, FormGroup, Button } from "react-bootstrap";

class NewConversationForm extends Component {
  state = {
    to: "",
    from: this.props.user,
    subject: "",
    content: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSendMessage = e => {
    e.preventDefault();
    let userType = localStorage.getItem("type");
    let type;
    if (userType === "coach") {
      type = "coaches";
    } else {
      type = "players";
    }
    this.props.sendMessage(type, this.state, this.props.user);
  };

  render() {
    return (
      <Form horizontal className="convo-form">
        <FormGroup>
          <label>To: </label>
          <input
            type="text"
            name="to"
            value={this.state.to}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Subject: </label>
          <input
            type="text"
            name="subject"
            value={this.state.subject}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <label>Message: </label>
          <textarea
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button onClick={this.handleSendMessage}>Send</Button>
      </Form>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (type, messageData, user) =>
      dispatch(actions.sendMessage(type, messageData, user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewConversationForm);
