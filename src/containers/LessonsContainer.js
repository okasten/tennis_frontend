import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import IndividualLesson from "../components/IndividualLesson";
import _sortBy from "lodash/sortBy";

class LessonsContainer extends Component {
  state = {
    search: "",
    searchStudent: ""
  };
  componentDidMount() {
    let type = localStorage.getItem("type");
    if (type === "player") {
      type = "players";
    } else {
      type = "coaches";
    }
    this.props.loadLessons(type, this.props.user);
  }

  showDates = () => {
    let dates = this.props.lessons.filter(lesson => {
      if (lesson.player !== null) {
        return lesson.date;
      }
    });
    dates = dates.map(lesson => lesson.date);
    let uniqueDates = [...new Set(dates)];

    uniqueDates = uniqueDates.map(lesson => <option>{lesson}</option>);

    return uniqueDates;
  };

  showStudents = () => {
    let students = this.props.user.players.map(player => player.name);
    let uniqueStudents = [...new Set(students)];

    uniqueStudents = uniqueStudents.map(player => <option>{player}</option>);
    return uniqueStudents;
  };

  showLessons = () => {
    let lessons = this.props.lessons.filter(lesson => {
      if (
        lesson.player !== null &&
        lesson.date === this.state.search &&
        (this.state.searchStudent === "" ||
          this.state.searchStudent === "Select")
      ) {
        return lesson;
      } else if (
        lesson.player !== null &&
        lesson.player.name == this.state.searchStudent &&
        (this.state.search === "" || this.state.search === "Select")
      ) {
        return lesson;
      } else if (
        lesson.player !== null &&
        lesson.player.name == this.state.searchStudent &&
        lesson.date === this.state.search
      ) {
        return lesson;
      } else if (
        lesson.player !== null &&
        (this.state.search === "" || this.state.search === "Select") &&
        (this.state.searchStudent === "" ||
          this.state.searchStudent === "Select")
      ) {
        return lesson;
      }
    });
    lessons = lessons.map(lesson => {
      return <IndividualLesson key={lesson.id} lesson={lesson} />;
    });
    return lessons;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <div className="lessonsContainer">
        <h1 className="goalFormHeader">My Lessons</h1>
        <div className="lessonSelect">
          Search by date:{" "}
          <select
            className="select"
            value={this.state.search}
            onChange={this.handleChange}
            name="search"
          >
            <option>Select</option>
            {this.props.lessons
              ? this.showDates()
              : "Loading previous dates..."}
          </select>
          {"     "} Search by Student:{" "}
          <select
            className="select"
            value={this.state.searchStudent}
            onChange={this.handleChange}
            name="searchStudent"
          >
            <option>Select</option>
            {this.props.lessons ? this.showStudents() : "Loading students..."}
          </select>
        </div>
        {this.props.lessons ? this.showLessons() : "Loading lessons..."}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    lessons: state.lessons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadLessons: (type, user) => dispatch(actions.loadUserLessons(type, user))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LessonsContainer);
