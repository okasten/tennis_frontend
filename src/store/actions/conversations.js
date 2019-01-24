const getConversations = conversations => {
  return {
    type: "GET_CONVERSATIONS",
    payload: conversations
  };
};

const updateConversations = conversation => {
  return {
    type: "UPDATE_CONVERSATIONS",
    payload: conversation
  };
};

const allMessages = messages => {
  return {
    type: "ALL_MESSAGES",
    payload: messages
  };
};

const addMessage = message => {
  return {
    type: "ADD_MESSAGE",
    payload: message
  };
};

const numberUnread = number => {
  return {
    type: "NUMBER_UNREAD",
    payload: number
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
      .then(conversation => dispatch(updateConversations(conversation)));
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

export const markMessagesRead = convo => {
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/conversations/${convo.id}/markRead`
    )
      .then(r => r.json())
      .then(numberUnread(0));
  };
};

export const getUnreadMessages = (user, type) => {
  return dispatch => {
    return fetch(
      `http://localhost:3000/api/v1/conversations/unreadmessages/${
        user.id
      }/${type}`
    )
      .then(r => r.json())
      .then(number => {
        dispatch(numberUnread(number));
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
    )
      .then(r => r.json())
      .then(message => {
        dispatch(addMessage(message));
      });
  };
};
