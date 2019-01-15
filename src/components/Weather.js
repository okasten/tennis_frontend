import React, { Component } from "react";
import {
  WiCloudUp,
  WiCloudy,
  WiSnowflakeCold,
  WiDaySunnyOvercast,
  WiDaySunny,
  WiDayShowers
} from "weather-icons-react";

class Weather extends Component {
  chooseIcon = () => {
    let type = this.props.weather.currently.icon;
    if (type.includes("partly-cloudy")) {
      return <WiDaySunnyOvercast />;
    } else if (type.includes("snow")) {
      return <WiSnowflakeCold />;
    } else if (type.includes("sunny")) {
      return <WiDaySunny />;
    } else if (type.includes("showers") || type.includes("rain")) {
      return <WiDayShowers />;
    }
  };
  render() {
    console.log(this.props.weather);
    return (
      <React.Fragment>
        {this.props.weather ? (
          <h1>
            {" "}
            {this.props.weather.currently.temperature}° {this.chooseIcon()}
          </h1>
        ) : (
          "Loading Weather..."
        )}
      </React.Fragment>
    );
  }
}

export default Weather;
