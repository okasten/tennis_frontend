import React, { Component } from "react";

class IndividualLesson extends Component {
  state = {
    showNotes: false
  };

  showNotes = () => {
    this.setState({
      showNotes: !this.state.showNotes
    });
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
        {this.state.showNotes ? <h5>{this.lessonNotes()}</h5> : null}
      </React.Fragment>
    );
  }
}

export default IndividualLesson;
