import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import tennis_ball from "../images/tennis-ball.png";

class HomePage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1>
          Adv
          {
            <img
              className="homePage_tennis"
              src={tennis_ball}
              alt="tennis ball"
            />
          }
          Scheduler
        </h1>
      </Jumbotron>
    );
  }
}

export default HomePage;
