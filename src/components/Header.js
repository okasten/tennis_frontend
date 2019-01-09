import React, { Component } from "react";
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from "react-bootstrap";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">AdvScheduler</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.props.currentUser ? (
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>
            <NavItem eventKey={1} href="#">
              Students
            </NavItem>
            <NavItem eventKey={2} href="#">
              Profile
            </NavItem>
            <NavItem>Log Out</NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem onClick={() => this.props.handleLogIn("signUp")}>
              {" "}
              Sign Up{" "}
            </NavItem>
            <NavItem onClick={() => this.props.handleLogIn("logIn")}>
              {" "}
              Log In{" "}
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(Header);
