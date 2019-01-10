//Action Creators
//log in the user
// const logIn = user => {
//   return {
//     type: "LOG_IN",
//     payload: user
//   };
// };

export const logInUser = user => {
  return {
    type: "LOG_IN",
    payload: user
  };
};

//Thunk Creators
//sign up a new user
export const createUser = user => {
  let userName = user.firstName + " " + user.lastName;
  return function thunk(dispatch) {
    return fetch(`http://localhost:3000/api/v1/coaches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        [user.userType]: {
          name: userName,
          password: user.password,
          email: user.email,
          username: user.username
        }
      })
    })
      .then(r => r.json())
      .then(res => dispatch(logInUser(res)))
      .catch(console.error);
  };
  //create the user with fetch
  //then log in that user
};
