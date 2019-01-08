import React, { Component } from "react";
import moment from "moment";
import HeaderMonth from "../components/HeaderMonth";

export default class Month extends Component {
  state = {
    currentMonth: {},
    nextMonth: {},
    previousMonth: {}
  };

  componentDidMount() {
    this.createState(this.props);
  }

  createState(props) {
    const currentMonth =
      props.match.params.year && props.match.params.month
        ? `${props.match.params.year}-${props.match.params.month}`
        : moment().format("YYYY-MM");

    const nextMonth = moment(currentMonth)
      .add(1, "M")
      .format("YYYY-MM");

    const previousMonth = moment(currentMonth)
      .subtract(1, "M")
      .format("YYYY-MM");

    this.setState({
      currentMonth: {
        date: currentMonth,
        name: moment(currentMonth).format("YYYY-MM"),
        days: moment(currentMonth).daysInMonth(),
        editDay: null
      },
      nextMonth: {
        date: nextMonth,
        slug: nextMonth.replace("-", "/")
      },
      previousMonth: {
        date: previousMonth,
        slug: previousMonth.replace("-", "/")
      }
    });
  }
  render() {
    return (
      <div className="month">
        <HeaderMonth
          currentMonth={this.state.currentMonth}
          nextMonth={this.state.nextMonth}
          previousMonth={this.state.previousMonth}
        />
      </div>
    );
  }
}
