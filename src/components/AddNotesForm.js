import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

class AddNotesForm extends Component {
  state = {
    notes: this.props.lesson.notes
  };

  handleChange = e => {
    this.setState({
      notes: e.target.value
    });
  };

  updateLesson = () => {
    console.log(this.state);
  };
  render() {
    return (
      <form>
        <textarea
          placeholder={this.props.lesson.notes}
          value={this.state.notes}
          onChange={this.handleChange}
        />
        <Button onClick={this.updateLesson}>Update Notes</Button>
      </form>
    );
  }
}

export default AddNotesForm;
