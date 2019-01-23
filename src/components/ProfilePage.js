import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import EditProfileForm from "./EditProfileForm";

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
      <div className="profileContainer">
        <h1 className="profileHeader">{this.props.user.name}'s Profile</h1>
        <img src={this.props.user.picture} alt="profile" />

        {this.state.editProfile ? (
          <EditProfileForm handleForm={this.handleClick} />
        ) : (
          <div>
            <h3>Username: {this.props.user.username}</h3>
            <h3>Email: {this.props.user.email}</h3>
            {localStorage.getItem("type") === "player" ? (
              <React.Fragment>
                <h3>Age: {this.props.user.age}</h3>
                <h3>Level: {this.props.user.level}</h3>
              </React.Fragment>
            ) : null}

            <Button className="editProfileButton" onClick={this.handleClick}>
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(ProfilePage);
