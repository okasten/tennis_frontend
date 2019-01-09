import React from "react";
import "./lesson.scss";

const lesson = props => (
  <article className="lesson" style={{ background: props.lesson.color }}>
    <div className="tools">
      <button onClick={() => props.handleDeleteLesson(props.lesson.id)}>
        <i className="fas fa-trash-alt" />
      </button>
      <button onClick={() => props.handleSetEdit(props.lesson)}>
        <i className="fas fa-edit" />
      </button>
    </div>
    <strong>{props.lesson.description}</strong>
    <time>{props.lesson.time}</time>
  </article>
);

export default lesson;
