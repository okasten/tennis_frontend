import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

class ProfilePage extends Component {
  state = {
    editProfile: false
  };

  handleClick = () => {
    this.setState({
      editProfile: !this.state.editProfile
    });
  };
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.user.name}'s Profile</h1>
        <img src={this.props.user.picture} />
        <h4>username: {this.props.user.username}</h4>
        <h4>Email: {this.props.user.email}</h4>
        {localStorage.getItem("type") === "player" ? (
          <React.Fragment>
            <h4>Age: {this.props.user.age}</h4>
            <h4>Level: {this.props.user.level}</h4>
          </React.Fragment>
        ) : null}

        <Button onClick={this.handleClick}>Edit Profile</Button>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfilePage);
