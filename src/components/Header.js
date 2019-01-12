import React, { Component } from "react";
import { Navbar, MenuItem, Nav, NavItem, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import CoachCalendars from "../containers/CoachCalendars";

class Header extends Component {
  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">AdvScheduler</a>
          </Navbar.Brand>
        </Navbar.Header>
        {this.props.user ? (
          <Nav pullRight>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
            </NavDropdown>

            {this.props.userType === "coach" ? (
              <NavItem eventKey={1} href="#">
                Students
              </NavItem>
            ) : (
              <NavItem
                eventKey={1}
                onClick={this.props.bookLessonsPage}
                href="#"
              >
                Book A Lesson
              </NavItem>
            )}
            <NavItem eventKey={2} href="#">
              Profile
            </NavItem>
            <NavItem onClick={this.props.handleLogOut}>Log Out</NavItem>
          </Nav>
        ) : (
          <Nav pullRight>
            <NavItem onClick={() => this.props.handleLogIn("signUp")}>
              <Link to="/signup"> Sign Up </Link>
            </NavItem>

            <NavItem onClick={() => this.props.handleLogIn("logIn")}>
              <Link to="/login"> Log In </Link>
            </NavItem>
          </Nav>
        )}
      </Navbar>
    );
  }
}

export default Header;
