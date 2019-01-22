import React, { Component } from "react";
import { Jumbotron } from "react-bootstrap";
import tennis_ball from "../images/tennis-ball.png";

class HomePage extends Component {
  render() {
    return (
      <Jumbotron className="jumbotron">
        <h1 className="adv">
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
        <p>The new scheduler for all your tennis lessons. Advantage, you.</p>
      </Jumbotron>
    );
  }
}

export default HomePage;
