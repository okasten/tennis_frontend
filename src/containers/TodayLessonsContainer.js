import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import TodayIndividualLesson from "../components/TodayIndividualLesson";
import * as actions from "../store/actions";

class TodayLessonsContainer extends Component {
  render() {
    let filteredLessons;
    let today = moment().format();
    let date = today.slice(0, 10);
    // let date = "2019-01-04";
    let todaysLessons = [];
    let showTodaysLessons = [];
    if (this.props.lessons[date]) {
      this.props.lessons[date].forEach(lesson => {
        todaysLessons.push(lesson);
      });
      if (localStorage.getItem("type") === "coach") {
        filteredLessons = todaysLessons.filter(lesson => lesson.player);
      } else {
        filteredLessons = todaysLessons.filter(lesson => {
          if (lesson.player) {
            if (lesson.player.name === this.props.user.name) {
              return lesson;
            }
          }
        });
      }
      showTodaysLessons = filteredLessons.map(lesson => {
        return (
          <TodayIndividualLesson coach={this.props.coach} lesson={lesson} />
        );
      });
    }
    return (
      <div>
        <h1 className="todayHeader">Today's Lessons</h1> <br />
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
