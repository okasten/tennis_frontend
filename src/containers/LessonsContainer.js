import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import IndividualLesson from "../components/IndividualLesson";
import _sortBy from "lodash/sortBy";

class LessonsContainer extends Component {
  state = {
    search: ""
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

  showLessons = () => {
    let lessons = this.props.lessons.filter(lesson => {
      if (lesson.player !== null && lesson.date === this.state.search) {
        return lesson;
      } else if (
        lesson.player !== null &&
        (this.state.search === "" || this.state.search === "Select")
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
      search: e.target.value
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
          >
            <option>Select</option>
            {this.props.lessons
              ? this.showDates()
              : "Loading previous dates..."}
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
