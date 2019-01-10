//Action Creators

export const logOutUser = () => {
  return {
    type: "LOG_OUT",
    payload: null
  };
};

export const logIn = user => {
  return {
    type: "LOG_IN",
    payload: user
  };
};

//Thunk Creators
//sign up a new user
export const createUser = user => {
  let userName = user.firstName + " " + user.lastName;
  console.log(user);
  return function thunk(dispatch) {
    return fetch(`http://localhost:3000/api/v1/${user.userType}`, {
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
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("type", res.type);
        dispatch(logIn(res));
      })
      .catch(console.error);
  };
  //create the user with fetch
  //then log in that user
};

export const logInUser = user => {
  return function thunk(dispatch) {
    return fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user: {
          username: user.username,
          password: user.password
        }
      })
    })
      .then(r => r.json())
      .then(res => {
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("type", res.type);
        dispatch(logIn(res));
      });
  };
};
