import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AddNotesForm from "./AddNotesForm";

class TodayIndividualLesson extends Component {
  state = {
    showNotes: false
  };

  showNotes = () => {
    this.setState({
      showNotes: !this.state.showNotes
    });
  };

  lessonNotes = () => {
    if (this.props.lesson.notes || this.props.lesson.description) {
      return this.props.lesson.notes || this.props.lesson.description;
    } else {
      return "No notes to show!";
    }
  };

  render() {
    console.log(this.props.coach);
    return (
      <React.Fragment>
        <h4 className="todayIndividualLesson" onClick={this.showNotes}>
          <span>
            {this.props.lesson.time} <h5>with</h5>{" "}
            {localStorage.getItem("type") === "coach"
              ? this.props.lesson.player.name
              : this.props.coach}
          </span>
        </h4>
        {this.state.showNotes ? <h5>{this.lessonNotes()}</h5> : null}
      </React.Fragment>
    );
  }
}

export default TodayIndividualLesson;
