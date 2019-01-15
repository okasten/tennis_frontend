import React, { Component } from "react";

class Weather extends Component {
  render() {
    console.log(this.props.weather);
    return (
      <React.Fragment>
        {this.props.weather ? (
          <h1> {this.props.weather.currently.apparentTemperature}°</h1>
        ) : (
          "Loading Weather..."
        )}
      </React.Fragment>
    );
  }
}

export default Weather;
