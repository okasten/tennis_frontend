import React, { Component } from "react";
import {
  WiSnowflakeCold,
  WiDaySunnyOvercast,
  WiDaySunny,
  WiDayShowers
} from "weather-icons-react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
let lat;
let long;
let count = 0;

class Weather extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      this.props.getWeather(lat, long);
    });
  }

  shouldComponentUpdate() {
    if (count > 1) {
      return false;
    } else {
      return true;
    }
  }
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
    } else if (type.includes("clear")) {
      return <WiDaySunny />;
    }
  };

  increaseCount = () => {
    count = count + 1;
  };
  render() {
    this.increaseCount();
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

const mapStateToProps = state => {
  return {
    weather: state.weather
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getWeather: (lat, long) => {
      dispatch(actions.getWeather(lat, long));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Weather);
