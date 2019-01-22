import React from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";
import "./lessonForm.scss";

const lessonForm = props => {
  const time = props.lesson.time
    ? moment(props.lesson.time, "HH:mm a")
    : moment()
        .hour(0)
        .minute(0);

  let userType = localStorage.getItem("type");

  return (
    <form
      method="post"
      onSubmit={e => props.handleCreateUpdateLesson(e, props.lesson, userType)}
    >
      {userType === "coach" ? (
        <TimePicker
          showSecond={false}
          placeholder="Time"
          format="h:mm a"
          use12Hours
          inputReadOnly
        />
      ) : (
        <div>
          {props.lesson.student}
          <textarea
            className="description"
            placeholder="Any notes?"
            maxLength="30"
            defaultValue={props.lesson.description}
          />
        </div>
      )}

      <button className="btn-submit">
        {userType === "coach" ? "Add Lesson" : "Book Lesson"}
      </button>
      <button
        className="btn-cancel"
        onClick={() => props.handleSetEditDay(null)}
      >
        Cancel
      </button>
    </form>
  );
};

export default lessonForm;
