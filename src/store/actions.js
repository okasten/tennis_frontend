const createLessonAction = lesson => {
  return {
    type: "CREATE_LESSON",
    payload: lesson
  };
};

const updateLessonAction = lesson => {
  return {
    type: "UPDATE_LESSON",
    payload: lesson
  };
};

const deleteLessonAction = lesson => {
  return {
    type: "DELETE_LESSON",
    payload: lesson
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

export const deleteLesson = lesson => {
  return dispatch => {
    dispatch(deleteLessonAction(lesson));
  };
};
