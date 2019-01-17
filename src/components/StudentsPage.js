import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import IndividualStudent from "../containers/IndividualStudent";

let studentNames = [];

class StudentsPage extends Component {
  state = {
    studentShowPage: false,
    currentStudent: ""
  };

  componentDidMount() {
    this.props.getStudents(this.props.user.id);
  }

  show = student => {
    this.setState({
      studentShowPage: true,
      currentStudent: student
    });
  };
  render() {
    if (this.props.students) {
      studentNames = this.props.students.map(student => {
        return <h4 onClick={() => this.show(student)}>{student.name}</h4>;
      });
    }

    return (
      <React.Fragment>
        <h1>Student's Page</h1>
        <h3>My Students</h3>
        {studentNames.length > 0
          ? studentNames
          : "You don't have any students yet!"}
        {this.state.studentShowPage ? (
          <IndividualStudent student={this.state.currentStudent} />
        ) : null}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.currentUser,
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStudents: coach_id => dispatch(actions.getStudents(coach_id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsPage);
