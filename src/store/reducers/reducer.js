import uniqueId from "uuid/v1";

const initialState = { currentUser: null, lessons: [] };

const logInUser = (prevState, action) => {
  console.log(action.payload);
  return { ...prevState, currentUser: action.payload };
};

const logOutUser = (prevState, action) => {
  return { ...prevState, currentUser: action.payload };
};

const createLesson = (prevState, action) => {
  const lesson = {
    id: uniqueId(),
    time: action.lesson.time,
    description: action.lesson.description,
    color: action.lesson.color
  };

  return {
    ...prevState,
    [action.lesson.day]: prevState[action.lesson.day]
      ? prevState[action.lesson.day].concat(lesson)
      : [lesson]
  };
};

const updateLesson = (prevState, action) => {
  let lessons = [];
  [...prevState[action.lesson.day]].forEach(lesson => {
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
    [action.lesson.day]: lessons
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
    case "LOG_IN":
      return logInUser(prevState, action);
    case "LOG_OUT":
      return logOutUser(prevState, action);
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
