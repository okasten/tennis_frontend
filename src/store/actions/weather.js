const loadWeather = weather => {
  return {
    type: "LOAD_WEATHER",
    payload: weather
  };
};

export const getWeather = (lat, long) => {
  return function thunk(dispatch) {
    return fetch(
      `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/73c004a7b29e6481cadd944018ee4dcd/${lat},${long}`
    )
      .then(r => r.json())
      .then(weather => {
        dispatch(loadWeather(weather));
      });
  };
};
