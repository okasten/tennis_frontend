import React, { Component } from "react";
import "./lesson.scss";
class Lesson extends Component {
  determinePermissions = () => {
    let userType = localStorage.getItem("type");
    if (userType === "coach") {
      return (
        <React.Fragment>
          <button
            onClick={() => this.props.handleDeleteLesson(this.props.lesson.id)}
          >
            <i className="fas fa-trash-alt" />
          </button>
          <button onClick={() => this.props.handleSetEdit(this.props.lesson)}>
            <i className="fas fa-edit" />
          </button>
        </React.Fragment>
      );
    } else if (!this.props.lesson.player) {
      return (
        <button onClick={() => this.props.handleSetEdit(this.props.lesson)}>
          <i className="fas fa-edit" />
        </button>
      );
    }
  };
  render() {
    return (
      <article
        className="lesson"
        style={{ background: this.props.lesson.color }}
      >
        <div className="tools">{this.determinePermissions()}</div>
        <strong>
          {this.props.lesson.player
            ? this.props.lesson.player.name
            : "Available"}
        </strong>
        <time>{this.props.lesson.time}</time>
      </article>
    );
  }
}

export default Lesson;
