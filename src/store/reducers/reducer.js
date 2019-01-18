const initialState = { currentUser: null };

const logInUser = (prevState, action) => {
  console.log(action.payload);
  return { ...prevState, currentUser: action.payload };
};

const logOutUser = (prevState, action) => {
  return { currentUser: action.payload };
};

const getAllCoaches = (prevState, action) => {
  return { currentUser: prevState.currentUser, coaches: action.payload };
};

const getAllPlayers = (prevState, action) => {
  return { ...prevState, players: action.payload };
};

const createLesson = (prevState, action) => {
  const lesson = {
    id: action.id,
    time: action.time,
    description: action.notes,
    color: action.color,
    coach: action.coach,
    date: action.date,
    player: action.player
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
        color: action.lesson.color,
        player: action.lesson.player
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

const clearLessons = (prevState, action) => {
  return {
    currentUser: prevState.currentUser,
    coaches: prevState.coaches
  };
};

const getConversations = (prevState, action) => {
  return {
    ...prevState,
    conversations: action.payload
  };
};

const allMessages = (prevState, action) => {
  return {
    ...prevState,
    messages: action.payload
  };
};

const addMessage = (prevState, action) => {
  return { ...prevState, messages: [...prevState.messages, action.payload] };
};

const numberUnread = (prevState, action) => {
  return { ...prevState, numberUnread: action.payload };
};

const loadWeather = (prevState, action) => {
  console.log(action);
  return {
    ...prevState,
    weather: action.payload
  };
};

const updateUser = (prevState, action) => {
  return {
    ...prevState,
    currentUser: action.payload
  };
};

const loadStudents = (prevState, action) => {
  return {
    ...prevState,
    students: action.payload
  };
};

const newGoal = (prevState, action) => {
  return {
    ...prevState,
    goals: [...prevState.currentUser.goals, action.payload]
  };
};

const editGoal = (prevState, action) => {
  let newArray = [...prevState.currentUser.goals].map(goal => {
    if (goal.id === action.payload.id) {
      return (goal = action.payload);
    } else {
      return goal;
    }
  });
  return {
    ...prevState,
    goals: newArray,
    goal: action.payload
  };
};

const deleteGoal = (prevState, action) => {
  let newArray = [...prevState.currentUser.goals].filter(goal => {
    if (goal.id !== action.payload.id) {
      return goal;
    }
  });

  return {
    ...prevState,
    goals: newArray
  };
};

const getGoal = (prevState, action) => {
  return { ...prevState, goal: action.payload };
};

const getGoals = (prevState, action) => {
  return { ...prevState, goals: action.payload };
};
const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case "LOG_IN":
      return logInUser(prevState, action);
    case "LOG_OUT":
      return logOutUser(prevState, action);
    case "ALL_COACHES":
      return getAllCoaches(prevState, action);
    case "UPDATE_USER":
      return updateUser(prevState, action);
    case "ALL_PLAYERS":
      return getAllPlayers(prevState, action);
    case "LOAD_STUDENTS":
      return loadStudents(prevState, action);
    case "GET_CONVERSATIONS":
      return getConversations(prevState, action);
    case "ALL_MESSAGES":
      return allMessages(prevState, action);
    case "ADD_MESSAGE":
      return addMessage(prevState, action);
    case "NUMBER_UNREAD":
      return numberUnread(prevState, action);
    case "CLEAR_LESSONS":
      return clearLessons(prevState, action);
    case "CREATE_LESSON":
      return createLesson(prevState, action.lesson);
    case "UPDATE_LESSON":
      return updateLesson(prevState, action);
    case "DELETE_LESSON":
      return deleteLesson(prevState, action);
    case "LOAD_WEATHER":
      return loadWeather(prevState, action);
    case "NEW_GOAL":
      return newGoal(prevState, action);
    case "EDIT_GOAL":
      return editGoal(prevState, action);
    case "DELETE_GOAL":
      return deleteGoal(prevState, action);
    case "GET_GOAL":
      return getGoal(prevState, action);
    case "GET_GOALS":
      return getGoals(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
