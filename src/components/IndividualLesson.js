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
    this.setState({
      showNotes: false,
      editLesson: !this.state.editLesson
    });
  };

  closeEdit = () => {
    this.setState({
      showNotes: true,
      editLesson: false
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
      <div className="individualLessons">
        <h3 className="individualLesson" onClick={this.showNotes}>
          {this.props.lesson.date} with{" "}
          {localStorage.getItem("type") === "coach" &&
          this.props.lesson.player !== null
            ? this.props.lesson.player.name
            : this.props.lesson.coach.name}{" "}
        </h3>
        {this.state.editLesson ? (
          <AddNotesForm closeEdit={this.closeEdit} lesson={this.props.lesson} />
        ) : null}
        {this.state.showNotes ? (
          <div className="showNotes">
            <h4>
              {this.lessonNotes()}
              <br />
              <Button className="notes" onClick={this.editLesson}>
                Edit Notes
              </Button>
              <Button bsStyle="danger" className="notes">
                Delete Lesson
              </Button>
            </h4>
          </div>
        ) : null}
      </div>
    );
  }
}

export default IndividualLesson;
