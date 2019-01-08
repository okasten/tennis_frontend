import React, { Component } from "react";
import { connect } from "react-redux";
import { createLesson, updateLesson, deleteLesson } from "../store/actions.js";
import "./day.scss";

class Day extends Component {
  render() {
    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";
    return <article className={cssClasses} />;
  }
}

const mapStateToProps = state => {
  return {
    lessons: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLesson: lesson => dispatch(createLesson(lesson)),
    updateLesson: lesson => dispatch(updateLesson(lesson)),
    deleteLesson: lesson => dispatch(deleteLesson(lesson))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
