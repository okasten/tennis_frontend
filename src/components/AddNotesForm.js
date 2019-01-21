import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import * as actions from "../store/actions";

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
    this.props.addNotes(this.props.lesson.id, this.state);
    this.props.closeEdit();
  };
  render() {
    return (
      <form>
        <textarea
          placeholder={this.props.lesson.notes}
          value={this.state.notes}
          onChange={this.handleChange}
        />
        <Button onClick={() => this.props.closeEdit()}>Cancel</Button>
        <Button onClick={this.updateLesson}>Update Notes</Button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addNotes: (lesson_id, notes) => dispatch(actions.addNotes(lesson_id, notes))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AddNotesForm);
