import React, { Component } from "react";

class IndividualStudent extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>{this.props.student.name}</h1>
        <img src={this.props.student.picture} alt="student profile" />
        <h3>Username: {this.props.student.username}</h3>
        <h3>Email: {this.props.student.email}</h3>
        <h3>Age: {this.props.student.age} </h3>
        <h3>Level: {this.props.student.level} </h3>
      </React.Fragment>
    );
  }
}

export default IndividualStudent;
