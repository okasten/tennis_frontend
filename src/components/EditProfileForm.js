import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import * as actions from "../store/actions";

class EditProfileForm extends Component {
  state = {
    username: this.props.user.username,
    name: this.props.user.name,
    picture: this.props.user.picture,
    email: this.props.user.email,
    age: this.props.user.age,
    level: this.props.user.level
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleUpdate = () => {
    console.log(this.state);
    let userType = localStorage.getItem("type");
    let type;
    if (userType === "player") {
      type = "players";
    } else {
      type = "coaches";
    }
    this.props.updateUser(type, this.props.user, this.state);
    this.props.handleForm();
  };
  render() {
    return (
      <form className="profileForm" onSubmit={this.handleUpdate}>
        <label>Username: </label>
        <input
          className="inputGoal"
          type="text"
          value={this.state.username}
          onChange={this.handleChange}
          name="username"
          placeholder={this.props.user.username}
        />{" "}
        <label>Name: </label>
        <input
          className="inputGoal"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          name="name"
          placeholder={this.props.user.name}
        />
        <label>Picture: </label>
        <input
          className="inputGoal"
          type="text"
          value={this.state.picture}
          onChange={this.handleChange}
          name="picture"
          placeholder={this.props.user.picture}
        />
        <label>Email: </label>
        <input
          className="inputGoal"
          type="text"
          value={this.state.email}
          onChange={this.handleChange}
          name="email"
          placeholder={this.props.user.email}
        />
        {localStorage.getItem("type") === "player" ? (
          <React.Fragment>
            <label>Age: </label>
            <input
              className="inputGoal"
              type="number"
              value={this.state.age}
              onChange={this.handleChange}
              name="age"
              placeholder={this.props.user.age}
            />
            <label>Level: </label>
            <input
              className="inputGoal"
              type="text"
              value={this.state.level}
              onChange={this.handleChange}
              name="level"
              placeholder={this.props.user.level}
            />
          </React.Fragment>
        ) : null}
        <Button className="editProfileButton" onClick={this.handleUpdate}>
          Update Profile
        </Button>
        <Button
          className="editProfileButton"
          bsStyle="danger"
          onClick={() => this.props.handleForm()}
        >
          Cancel
        </Button>
      </form>
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
    updateUser: (type, user, info) =>
      dispatch(actions.updateUser(type, user, info))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProfileForm);
