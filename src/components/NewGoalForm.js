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
        Create A New Goal
        <FormGroup onChange={this.handleChange}>
          <Radio name="kind" value="Short-Term" inline>
            Short-Term
          </Radio>
          <Radio name="kind" value="Long-Term" inline>
            Long-Term
          </Radio>
        </FormGroup>
        <input
          onChange={this.handleChange}
          name="objective"
          value={this.state.objective}
          placeholder="Objective"
        />
        <textarea
          onChange={this.handleChange}
          name="notes"
          value={this.state.notes}
          placeholder="Notes"
        />
        <Button onClick={() => this.props.setGoal(this.state)}>Set Goal</Button>
      </form>
    );
  }
}

export default NewGoalForm;
