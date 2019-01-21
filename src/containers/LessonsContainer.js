import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import IndividualLesson from "../components/IndividualLesson";

class LessonsContainer extends Component {
  componentDidMount() {
    let type = localStorage.getItem("type");
    if (type === "player") {
      type = "players";
    } else {
      type = "coaches";
    }
    this.props.loadLessons(type, this.props.user);
  }

  showLessons = () => {
    let lessons = this.props.lessons.filter(lesson => {
      return lesson.player;
    });
    lessons = lessons.map(lesson => {
      return <IndividualLesson key={lesson.id} lesson={lesson} />;
    });
    return lessons;
  };
  render() {
    return (
      <React.Fragment>
        <h1>LESSONS PAGE</h1>
        {this.props.lessons ? this.showLessons() : "Loading lessons..."}
      </React.Fragment>
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
