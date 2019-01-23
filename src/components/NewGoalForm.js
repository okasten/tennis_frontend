import React, { Component } from "react";
import { Radio, FormGroup, Button } from "react-bootstrap";

class NewGoalForm extends Component {
  state = {
    objective: "",
    kind: "",
    notes: "",
    met: false
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    return (
      <form>
        <h1 className="goalFormHeader">Make A New #GOAL!</h1>
        <FormGroup onChange={this.handleChange}>
          <span>
            <Radio name="kind" value="Short-Term">
              Short-Term
            </Radio>
            <Radio name="kind" value="Long-Term">
              Long-Term
            </Radio>
          </span>
        </FormGroup>
        <label>Objective: </label>
        <input
          onChange={this.handleChange}
          name="objective"
          value={this.state.objective}
          placeholder="Objective"
        />
        <label>Notes: </label>
        <textarea
          onChange={this.handleChange}
          name="notes"
          value={this.state.notes}
          placeholder="Notes"
        />
        <Button
          className="goalButton"
          onClick={() => this.props.setGoal(this.state)}
        >
          Set Goal
        </Button>
        <Button
          className="goalButton"
          bsStyle="danger"
          onClick={this.props.closeForm}
        >
          Cancel
        </Button>
      </form>
    );
  }
}

export default NewGoalForm;
