const newGoal = goal => {
  return {
    type: "NEW_GOAL",
    payload: goal
  };
};

const editGoal = goal => {
  return {
    type: "EDIT_GOAL",
    payload: goal
  };
};

export const addGoal = (user, goal) => {
  return function thunk(dispatch) {
    return fetch(`http://localhost:3000/api/v1/players/${user.id}/goals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ goal: goal })
    })
      .then(r => r.json())
      .then(goal => dispatch(newGoal(goal)));
  };
};

export const updateGoal = (goal, updateInfo) => {
  return function thunk(dispatch) {
    return fetch(`http://localhost:3000/api/v1/goals/${goal.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ goal: updateInfo })
    })
      .then(r => r.json())
      .then(goal => dispatch(editGoal(goal)));
  };
};
