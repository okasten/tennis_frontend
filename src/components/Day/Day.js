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

  handleCreateUpdateLesson = (e, update, userType) => {
    e.preventDefault();

    const form = e.target;
    const description = form.querySelector(".description").value.trim();
    let user;

    if (userType === "player") {
      console.log(this.props.user);
      user = this.props.user;
    } else {
      user = null;
    }
    console.log(user);
    if (description.length) {
      const payloadUpdate = {
        date: this.props.date,
        notes: description,
        time: this.state.editLesson.time,
        location: this.state.editLesson.location,
        player: user,
        color: this.state.editLesson.color || defaultColor
      };
      if (userType === "coach") {
        const payloadCreate = {
          date: this.props.date,
          time: form.querySelector(".rc-time-picker-input").value,
          notes: description,
          location: this.state.editLesson.location,
          coach: this.props.user,
          player: null,
          color: this.state.editLesson.color || defaultColor
        };

        this.props.createLesson(payloadCreate);
      }

      if (update.id) {
        payloadUpdate["id"] = update.id;
        this.props.updateLesson(this.props.user, userType, payloadUpdate);
      }
    }

    this.props.handleSetEditDay(null);
    this.setState({ editLesson: {} });
  };

  handleDeleteLesson = id => {
    console.log(id);
    this.props.deleteLesson(this.props.user, id, this.props.date);
  };

  determineEditability = () => {
    if (this.props.editDay === this.props.day) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    const lessons = _sortBy(this.props.lessons[this.props.date], "time") || [];

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

        {this.determineEditability() ? (
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
  return {
    lessons: state,
    user: state.currentUser
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createLesson: payload => dispatch(actions.createLesson(payload)),
    updateLesson: (user, userType, payload) =>
      dispatch(actions.updateLesson(user, userType, payload)),
    deleteLesson: (user, id, date) =>
      dispatch(actions.deleteLesson(user, id, date))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Day);
