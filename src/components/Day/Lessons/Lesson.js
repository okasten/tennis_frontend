import React from "react";
import "./lesson.scss";

const lesson = props => (
  <article className="lesson" style={{ background: props.lesson.color }}>
    <div className="tools">
      {localStorage.getItem("type") === "coach" ? (
        <button onClick={() => props.handleDeleteLesson(props.lesson.id)}>
          <i className="fas fa-trash-alt" />
        </button>
      ) : null}

      <button onClick={() => props.handleSetEdit(props.lesson)}>
        <i className="fas fa-edit" />
      </button>
    </div>
    <strong>
      {props.lesson.player ? props.lesson.player.name : "Available"}
    </strong>
    <time>{props.lesson.time}</time>
  </article>
);

export default lesson;
