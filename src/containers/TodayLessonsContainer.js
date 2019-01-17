import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import IndividualLesson from "../components/IndividualLesson";

class TodayLessonsContainer extends Component {
  render() {
    let today = moment().format();
    let date = today.slice(0, 10);
    if (date[9] === "0") {
      date[9] = "O";
    }

    let todaysLessons = [];
    let showTodaysLessons = [];
    if (this.props.lessons[date]) {
      this.props.lessons[date].forEach(lesson => {
        todaysLessons.push(lesson);
      });

      let filteredLessons = todaysLessons.filter(lesson => lesson.player);

      showTodaysLessons = filteredLessons.map(lesson => {
        return <IndividualLesson lesson={lesson} />;
      });
    }
    return (
      <div>
        <h3>Today's Lessons</h3> <br />
        {showTodaysLessons.length > 0 ? (
          <div>{showTodaysLessons}</div>
        ) : (
          "There are no lessons on your schedule today!"
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lessons: state,
    user: state.currentUser
  };
};

export default connect(mapStateToProps)(TodayLessonsContainer);
