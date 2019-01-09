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
// export const signUp = user => {
//   return function(dispatch) {
//     return fetch(`http://localhost:3000/`);
//   };
//   //create the user with fetch
//   //then log in that user
// };
