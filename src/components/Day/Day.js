import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import _sortBy from "lodash/sortBy";
import LessonForm from "./Lessons/LessonForm";
import Lesson from "./Lessons/Lesson";
import "./day.scss";

const defaultColor = "#000";

class Day extends Component {
  state = {
    editLesson: {
      id: null,
      time: null,
      description: null,
      color: defaultColor,
      player: null,
      location: null
    }
  };

  handleSetColor = data => {
    this.setState({
      editLesson: {
        ...this.state.editLesson,
        color: data.color
      }
    });
  };

  handleSetEdit = lesson => {
    this.props.handleSetEditDay(this.props.day);

    this.setState({
      editLesson: {
        ...this.state.editLesson,
        ...lesson
      }
    });
  };

  handleCreateUpdateLesson = (e, update) => {
    e.preventDefault();

    const form = e.target;
    const description = form.querySelector(".description").value.trim();

    if (description.length) {
      const payload = {
        date: this.props.date,
        time: form.querySelector(".rc-time-picker-input").value,
        notes: description,
        location: this.state.editLesson.location,
        coach: this.props.user,
        player: null,
        color: this.state.editLesson.color || defaultColor
      };

      if (update.id) {
        payload["id"] = update.id;
        this.props.updateLesson(payload);
      } else {
        this.props.createLesson(payload);
      }
    }

    this.props.handleSetEditDay(null);
    this.setState({ editLesson: {} });
  };

  handleDeleteLesson = id => {
    this.props.deleteLesson(this.props.user, id, this.props.date);
  };

  render() {
    // console.log(this.props.lessons);
    const lessons = _sortBy(this.props.lessons[this.props.date], "time") || [];

    // const lessons = _sortBy(this.props.lessons[this.props.date], "time") || [];
    // console.log(lessons);

    const cssClasses = this.props.firstDayIndex
      ? `day first-index-${this.props.firstDayIndex}`
      : "day";

    return (
      <article className={cssClasses}>
        {!this.props.editDay && (
          <button
            className="btn-new-reminder"
            onClick={() => this.props.handleSetEditDay(this.props.day)}
          >
            <i className="fas fa-plus-circle" />
          </button>
        )}

        {this.props.editDay === this.props.day ? (
          <LessonForm
            lesson={this.state.editLesson}
            handleSetEditDay={this.props.handleSetEditDay}
            handleCreateUpdateLesson={this.handleCreateUpdateLesson}
          />
        ) : (
          <React.Fragment>
            <header>{this.props.day}</header>
            {lessons.length
              ? lessons.map((lesson, i) => {
                  return (
                    <Lesson
                      key={i}
                      lesson={lesson}
                      handleSetEdit={this.handleSetEdit}
                      handleDeleteLesson={this.handleDeleteLesson}
                    />
                  );
                })
              : null}
          </React.Fragment>
        )}
      </article>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  return {
    lessons: state,
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLesson: payload => dispatch(actions.createLesson(payload)),
    updateLesson: payload => dispatch(actions.updateLesson(payload)),
    deleteLesson: (user, id, date) =>
      dispatch(actions.deleteLesson(user, id, date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
