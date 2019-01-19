import React, { Component } from "react";
import {
  Navbar,
  MenuItem,
  Nav,
  NavItem,
  NavDropdown,
  Badge
} from "react-bootstrap";
import { Link } from "react-router-dom";

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
            <NavItem onClick={this.props.lessonsPage}>Lessons</NavItem>

            {this.props.userType === "coach" ? (
              <React.Fragment>
                <NavItem
                  eventKey={1}
                  href="#"
                  onClick={this.props.studentsPage}
                >
                  Students
                </NavItem>
                <NavItem onClick={this.props.bookLessonsPage}>Calendar</NavItem>
                <NavItem onClick={this.props.messagesPage}>Messages</NavItem>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <NavItem onClick={this.props.goalsPage}>Goals</NavItem>
                <NavItem
                  eventKey={1}
                  onClick={this.props.bookLessonsPage}
                  href="#"
                >
                  Book A Lesson
                </NavItem>
                <NavItem onClick={this.props.messagesPage}>
                  Messages<Badge>{this.props.unreadMessages}</Badge>
                </NavItem>
              </React.Fragment>
            )}
            <NavItem eventKey={2} href="#" onClick={this.props.profilePage}>
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
