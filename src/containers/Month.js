import React, { Component } from "react";
import moment from "moment";
import HeaderMonth from "../components/HeaderMonth";
import HeaderWeekDays from "../components/HeaderWeekDays";
import Day from "../components/Day/Day";
import "./Month.scss";
import { connect } from "react-redux";
import * as actions from "./../store/actions";

class Month extends Component {
  state = {
    currentMonth: {},
    nextMonth: {},
    previousMonth: {}
  };

  componentDidMount() {
    this.createState(this.props);
    this.props.loadLessons(this.props.user);
  }

  componentWillReceiveProps(nextProps) {
    this.createState(nextProps, true);
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

  handleSetEditDay = day => {
    this.setState({
      currentMonth: {
        ...this.state.currentMonth,
        editDay: day
      }
    });
  };

  buildDays() {
    const days = [];
    const props = {
      editDay: this.state.currentMonth.editDay,
      handleSetEditDay: this.handleSetEditDay
    };

    for (let i = 1; i <= this.state.currentMonth.days; i++) {
      let date = `${this.state.currentMonth.date}-${("0" + i).slice(-2)}`;
      props["date"] = date;
      props["day"] = i;

      if (i === 1) {
        props["firstDayIndex"] = moment(this.state.currentMonth.date)
          .startOf("month")
          .format("d");
      } else {
        delete props["firstDayIndex"];
      }

      days.push(<Day key={i} {...props} />);
    }

    return days;
  }

  render() {
    const weekdays = moment.weekdays();
    const days = this.buildDays();

    return (
      <div className="month">
        <HeaderMonth
          currentMonth={this.state.currentMonth}
          nextMonth={this.state.nextMonth}
          previousMonth={this.state.previousMonth}
        />
        <HeaderWeekDays days={weekdays} />
        <section className="days">{days}</section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLessons: payload => dispatch(actions.loadLessons(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Month);
