const createLessonAction = lesson => {
  return {
    type: "CREATE_LESSON",
    lesson: lesson
  };
};

const clearLessonsAction = () => {
  return {
    type: "CLEAR_LESSONS"
  };
};

const updateLessonAction = lesson => {
  return {
    type: "UPDATE_LESSON",
    lesson: lesson
  };
};

const deleteLessonAction = (id, date) => {
  return {
    type: "DELETE_LESSON",
    id: id,
    date: date
  };
};

const getLessons = lessons => {
  return {
    type: "GET_LESSONS",
    payload: lessons
  };
};

const addNotesAction = lesson => {
  return {
    type: "ADD_NOTES",
    payload: lesson
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
      .then(res => {
        console.log(res);
        dispatch(createLessonAction(lesson));
      });

    // };
  };
};

export const loadLessons = coach_id => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/coaches/${coach_id}/lessons`)
      .then(r => r.json())
      .then(res => {
        dispatch(clearLessonsAction());
        if (
          res.length
            ? res.forEach(lesson => {
                dispatch(createLessonAction(lesson));
              })
            : null
        );
      });
  };
};

export const updateLesson = (user, userType, lesson) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/lessons/${lesson.id}/book`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        lesson: lesson
      })
    })
      .then(r => r.json())
      .then(res => {
        dispatch(updateLessonAction(lesson));
      });
  };
};

export const deleteLesson = (user, lesson_id, date) => {
  console.log(user, lesson_id);
  return dispatch => {
    return (
      fetch(
        `http://localhost:3000/api/v1/coaches/${user.id}/lessons/${lesson_id}`,
        {
          method: "DELETE"
        }
      )
        // .then(r => r.json())
        .then(dispatch(deleteLessonAction(lesson_id, date)))
    );
  };
};

export const loadUserLessons = (type, user) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/${type}/${user.id}/lessons`)
      .then(r => r.json())
      .then(lessons => dispatch(getLessons(lessons)));
  };
};

export const addNotes = (lesson_id, notes) => {
  return dispatch => {
    return fetch(`http://localhost:3000/api/v1/lessons/${lesson_id}/addNotes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(notes)
    })
      .then(r => r.json())
      .then(lesson => dispatch(addNotesAction(lesson)));
  };
};
