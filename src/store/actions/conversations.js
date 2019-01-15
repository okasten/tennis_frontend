const getConversations = conversations => {
  return {
    type: "GET_CONVERSATIONS",
    payload: conversations
  };
};

const allMessages = messages => {
  return {
    type: "ALL_MESSAGES",
    payload: messages
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
};

export const getMessages = (user, conversation) => {
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/conversations/${conversation.id}/messages`
    )
      .then(r => r.json())
      .then(messages => {
        dispatch(allMessages(messages));
      });
  };
};

export const sendReply = (type, user, conversation, messageContent) => {
  console.log(conversation);
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/conversations/${conversation.id}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: {
            conversation: conversation,
            content: messageContent
          },
          [type]: user
        })
      }
    );
  };
};
