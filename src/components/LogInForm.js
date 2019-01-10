import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, FormGroup, Col, Radio, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createUser, logInUser } from "../store/actions";

class LogInForm extends Component {
  state = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    userType: ""
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSignUp = () => {
    this.props.createUser(this.state);
    this.props.handleLogIn();
  };

  handleLogIn = () => {
    this.props.logInUser(this.state);
    this.props.handleLogIn();
  };

  render() {
    return (
      <Form>
        {this.props.pullUpForm === "signUp" ? (
          <React.Fragment>
            <FormGroup>
              <Col sm={2}>First Name</Col>
              <Col sm={10}>
                <input
                  type="text"
                  name="firstName"
                  value={this.state.firstName}
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={2}>Last Name</Col>
              <Col sm={10}>
                <input
                  type="text"
                  name="lastName"
                  value={this.state.lastName}
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col sm={2}>Email</Col>
              <Col sm={10}>
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
          </React.Fragment>
        ) : null}

        <FormGroup>
          <Col sm={2}>Username</Col>
          <Col sm={10}>
            <input
              type="text"
              name="username"
              value={this.state.username}
              placeholder="Username"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col sm={2}>Password</Col>
          <Col sm={10}>
            <input
              type="password"
              name="password"
              value={this.state.password}
              placeholder="Password"
              onChange={this.handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup>
          <Radio
            name="userType"
            inline
            onChange={this.handleChange}
            value="coaches"
          >
            {" "}
            I am a Coach{" "}
          </Radio>
          <Radio
            name="userType"
            inline
            onChange={this.handleChange}
            value="players"
          >
            {" "}
            I am a Student{" "}
          </Radio>
        </FormGroup>

        <FormGroup>
          {this.props.pullUpForm === "signUp" ? (
            <Link to="/signup">
              <Button onClick={this.handleSignUp}> Sign Up </Button>
            </Link>
          ) : (
            <Link to="/login">
              <Button onClick={this.handleLogIn}> Log In </Button>
            </Link>
          )}
        </FormGroup>
      </Form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createUser: user => {
      dispatch(createUser(user));
    },
    logInUser: user => {
      dispatch(logInUser(user));
    }
  };
};
// export default LogInForm;

export default connect(
  null,
  mapDispatchToProps
)(LogInForm);
