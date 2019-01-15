const getConversations = conversations => {
  return {
    type: "GET_CONVERSATIONS",
    payload: conversations
  };
};

export const loadConversations = (type, user) => {
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/${type}/${user.id}/conversations`
    )
      .then(r => r.json())
      .then(convos => dispatch(getConversations(convos)));
  };
};

export const sendMessage = (type, messageData, user) => {
  console.log(messageData);
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/${type}/${user.id}/conversations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageData
        })
      }
    )
      .then(r => r.json())
      .then(console.log);
  };
  console.log(messageData);
};
