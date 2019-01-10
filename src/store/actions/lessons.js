const createLessonAction = lesson => {
  return {
    type: "CREATE_LESSON",
    lesson: lesson
  };
};

const updateLessonAction = lesson => {
  return {
    type: "UPDATE_LESSON",
    lesson: lesson
  };
};

const deleteLessonAction = (date, id) => {
  return {
    type: "DELETE_LESSON",
    date: date,
    id: id
  };
};

export const createLesson = lesson => {
  console.log(lesson);
  return function thunk(dispatch) {
    return fetch(
      `http://localhost:3000/api/v1/coaches/${lesson.coach.id}/lessons`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          lesson: {
            coach: lesson.coach,
            date: lesson.date,
            time: lesson.time,
            location: lesson.location,
            player: lesson.player,
            notes: lesson.notes
          }
        })
      }
    )
      .then(r => r.json())
      .then(console.log);

    //   dispatch(createLessonAction(lesson));
    // };
  };
};

export const updateLesson = lesson => {
  return dispatch => {
    dispatch(updateLessonAction(lesson));
  };
};

export const deleteLesson = (date, id) => {
  return dispatch => {
    dispatch(deleteLessonAction(date, id));
  };
};
