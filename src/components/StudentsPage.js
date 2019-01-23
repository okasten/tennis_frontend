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
        return (
          <h2 className="studentName" onClick={() => this.show(student)}>
            {student.name}
          </h2>
        );
      });
    }

    return (
      <div>
        <div className="studentsPage">
          <h1 className="studentHeader">My Students</h1>
          {studentNames.length > 0
            ? studentNames
            : "You don't have any students yet!"}
        </div>
        {this.state.studentShowPage ? (
          <div className="indiStudent">
            <IndividualStudent student={this.state.currentStudent} />
          </div>
        ) : null}
      </div>
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
