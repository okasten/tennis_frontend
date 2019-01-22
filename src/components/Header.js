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
import tennis_ball from "../images/tennis-ball.png";

class Header extends Component {
  render() {
    return (
      <Navbar className="Navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <span>
              <Link to="/">
                Adv
                {
                  <img
                    className="tennis_ball"
                    src={tennis_ball}
                    alt="tennis ball"
                  />
                }
                Scheduler
              </Link>
            </span>
          </Navbar.Brand>
        </Navbar.Header>
        {this.props.user ? (
          <React.Fragment>
            <Nav pullRight>
              <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                <MenuItem>
                  <Link to="/inbox">Inbox</Link>
                  <Badge>{this.props.unreadMessages}</Badge>
                </MenuItem>

                {this.props.userType === "coach" ? (
                  <React.Fragment>
                    <MenuItem>
                      <Link to="calendar">My Calendar</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="/students">My Students</Link>
                    </MenuItem>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <MenuItem>
                      <Link to="calendar">Book A Lesson</Link>
                    </MenuItem>
                    <MenuItem>
                      <Link to="goals">My Goals</Link>
                    </MenuItem>
                  </React.Fragment>
                )}
                <MenuItem>
                  <Link to="/lessons">My Lessons</Link>
                </MenuItem>
                <MenuItem divider />
                <MenuItem>
                  <Link to="/profile">My Profile</Link>
                </MenuItem>
              </NavDropdown>

              <NavItem onClick={this.props.handleLogOut}>
                <Link to="/">Log Out</Link>
              </NavItem>
            </Nav>
          </React.Fragment>
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
