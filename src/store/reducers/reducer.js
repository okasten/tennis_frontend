import uniqueId from "uuid/v1";

const initialState = { currentUser: null };

const logInUser = (prevState, action) => {
  console.log(action.payload);
  return { ...prevState, currentUser: action.payload };
};

const logOutUser = (prevState, action) => {
  return { currentUser: action.payload };
};

const getAllCoaches = (prevState, action) => {
  return { coaches: action.payload };
};

const createLesson = (prevState, action) => {
  const lesson = {
    id: action.id,
    time: action.time,
    description: action.notes,
    color: action.color,
    coach: action.coach,
    date: action.date
  };
  return {
    ...prevState,
    [action.date]: prevState[action.date]
      ? prevState[action.date].concat(lesson)
      : [lesson]
  };
};

const updateLesson = (prevState, action) => {
  console.log(action);
  let lessons = [];

  [...prevState[action.lesson.date]].forEach(lesson => {
    if (action.lesson.id === lesson.id) {
      lesson = {
        id: lesson.id,
        time: action.lesson.time,
        description: action.lesson.notes,
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
    case "LOG_IN":
      return logInUser(prevState, action);
    case "LOG_OUT":
      return logOutUser(prevState, action);
    case "ALL_COACHES":
      return getAllCoaches(prevState, action);
    case "CREATE_LESSON":
      return createLesson(prevState, action.lesson);
    case "UPDATE_LESSON":
      return updateLesson(prevState, action);
    case "DELETE_LESSON":
      return deleteLesson(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
