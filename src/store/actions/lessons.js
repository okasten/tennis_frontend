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
  return dispatch => {
    dispatch(createLessonAction(lesson));
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
