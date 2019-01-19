import React, { Component } from "react";
import { Button } from "react-bootstrap";
import AddNotesForm from "./AddNotesForm";

class IndividualLesson extends Component {
  state = {
    showNotes: false,
    editLesson: false
  };

  showNotes = () => {
    this.setState({
      showNotes: !this.state.showNotes
    });
  };

  editLesson = () => {
    console.log("edit me");
    this.setState({
      showNotes: false,
      editLesson: !this.state.editLesson
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
    return (
      <React.Fragment>
        <h3 onClick={this.showNotes}>
          {localStorage.getItem("type") === "coach"
            ? this.props.lesson.player.name
            : this.props.lesson.coach.name}{" "}
          on {this.props.lesson.date}
        </h3>
        {this.state.editLesson ? (
          <AddNotesForm lesson={this.props.lesson} />
        ) : null}
        {this.state.showNotes ? (
          <h5>
            {this.lessonNotes()}
            <Button onClick={this.editLesson}>Add Notes</Button>
            <Button>Delete Lesson</Button>
          </h5>
        ) : null}
      </React.Fragment>
    );
  }
}

export default IndividualLesson;
