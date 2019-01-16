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

const updateCurrentUser = user => {
  return {
    type: "UPDATE_USER",
    payload: user
  };
};

export const allCoaches = coaches => {
  return {
    type: "ALL_COACHES",
    payload: coaches
  };
};

export const allPlayers = players => {
  return {
    type: "ALL_PLAYERS",
    payload: players
  };
};

//Thunk Creators
//sign up a new user
export const createUser = user => {
  let userName = user.firstName + " " + user.lastName;
  let currentLocation = navigator.geolocation.getCurrentPosition(location =>
    console.log(location)
  );

  console.log(currentLocation, user);
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
          username: user.username,
          location: currentLocation
        }
      })
    })
      .then(r => r.json())
      .then(res => {
        console.log(res);
        localStorage.setItem("token", res.jwt);
        localStorage.setItem("type", res.type);
        dispatch(logIn(res.user));
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
        dispatch(logIn(res.user));
      });
  };
};

export const getCoaches = () => {
  return function thunk(dispatch) {
    return fetch("http://localhost:3000/api/v1/coaches")
      .then(r => r.json())
      .then(res => {
        dispatch(allCoaches(res));
      });
  };
};

export const getPlayers = () => {
  return function thunk(dispatch) {
    return fetch("http://localhost:3000/api/v1/players")
      .then(r => r.json())
      .then(res => dispatch(allPlayers(res)));
  };
};

export const updateUser = (type, user, info) => {
  return function thunk(dispatch) {
    return fetch(`http://localhost:3000/api/v1/${type}/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user: info })
    })
      .then(r => r.json())
      .then(user => dispatch(updateCurrentUser(user)));
  };
};
