import uniqueId from "uuid/v1";

const initialState = {};

const createLesson = (prevState, action) => {
  console.log(action);
  const lesson = {
    id: uniqueId(),
    time: action.lesson.time,
    description: action.lesson.description,
    color: action.lesson.color
  };

  return {
    ...prevState,
    [action.lesson.date]: prevState[action.lesson.date]
      ? prevState[action.lesson.date].concat(lesson)
      : [lesson]
  };
};

const updateLesson = (prevState, action) => {
  let lessons = [];
  lessons = [...prevState[action.lesson.date]].forEach(lesson => {
    if (action.lesson.id === lesson.id) {
      lesson = {
        id: lesson.id,
        time: action.lesson.time,
        description: action.lesson.description,
        color: action.lesson.color
      };
    }
    lessons.push(lesson);
  });

  return {
    ...prevState,
    [action.lesson.date]: lessons
  };
};

const deleteLesson = (prevState, action) => {
  return {
    ...prevState,
    [action.date]: [...prevState[action.date]].filter(lesson => {
      return lesson.id !== action.id;
    })
  };
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "CREATE_LESSON":
      return createLesson(prevState, action);
    case "UPDATE_LESSON":
      return updateLesson(prevState, action);
    case "DELETE_LESSON":
      return deleteLesson(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
