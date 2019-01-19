import React, { Component } from "react";
import { Button } from "react-bootstrap";

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
  };

  lessonNotes = () => {
    if (this.props.lesson.description) {
      return this.props.lesson.description;
    } else {
      return "No notes to show!";
    }
  };
  render() {
    return (
      <React.Fragment>
        <h3 onClick={this.showNotes}>
          {this.props.lesson.player.name} at {this.props.lesson.time}
        </h3>
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
