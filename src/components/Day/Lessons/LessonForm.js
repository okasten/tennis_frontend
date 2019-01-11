import React from "react";
import moment from "moment";
import TimePicker from "rc-time-picker";
import ColorPicker from "rc-color-picker";
import "rc-time-picker/assets/index.css";
import "rc-color-picker/assets/index.css";
import "./lessonForm.scss";

const lessonForm = props => {
  const time = props.lesson.time
    ? moment(props.lesson.time, "HH:mm a")
    : moment()
        .hour(0)
        .minute(0);

  return (
    <form
      method="post"
      onSubmit={e => props.handleCreateUpdateLesson(e, props.lesson)}
    >
      <input
        type="text"
        name="player"
        className="description"
        value={props.lesson.player}
        placeholder="Student Name"
      />
      <textarea
        className="description"
        placeholder="Any notes?"
        maxLength="30"
        defaultValue={props.lesson.description}
      />
      <TimePicker
        showSecond={false}
        placeholder="Time"
        format="h:mm a"
        use12Hours
        inputReadOnly
      />
      <ColorPicker
        className="color-picker"
        animation="slide-up"
        color={props.lesson.color || props.defaultColor}
        onClose={props.handleSetColor}
      />
      <button className="btn-submit">Book Lesson</button>
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
