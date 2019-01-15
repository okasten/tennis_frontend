import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import { Form, FormGroup, Button } from "react-bootstrap";

//if userType === "coach" then make a dispatch call to getPlayers and make a select drop down for who they want to send it to

class NewConversationForm extends Component {
  state = {
    to: "",
    from: this.props.user,
    subject: "",
    content: ""
  };

  componentDidMount() {
    let userType = localStorage.getItem("type");
    if (userType === "coach") {
      this.props.getPlayers();
    } else {
      this.props.getCoaches();
    }
  }

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
    console.log("players", this.props.players);
    console.log("coaches", this.props.coaches);
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
    user: state.currentUser,
    players: state.players,
    coaches: state.coaches
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sendMessage: (type, messageData, user) =>
      dispatch(actions.sendMessage(type, messageData, user)),
    getPlayers: () => dispatch(actions.getPlayers()),
    getCoaches: () => dispatch(actions.getCoaches())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewConversationForm);
