import React from 'react';

import withFirebase from '../../services/firebase/FirebaseContextHOC';
import { useDataFetcher } from '../../hooks/useDataFetcher';
import { useFormInputHook } from '../../hooks/formInputHook';

function Messages({ firebase, user }) {
  const { loading, data } = useDataFetcher(firebase._allMessages);

  // destructure form input hook exported vars and rename for clarity
  const {
    value: message,
    onChange: onMessageChange,
    reset: resetMessageInput
  } = useFormInputHook();

  const handleSubmit = e => {
    e.preventDefault();
    firebase
      ._allMessages()
      .push({ text: message, userId: user.uid })
      .then(() => resetMessageInput())
      .catch(e => console.error(e));
  };

  const removeMessage = uid => {
    firebase._message(uid).remove();
  };

  return (
    <>
      {loading ? (
        'Loading messages...'
      ) : data ? (
        <MessageList messages={data} removeMessage={removeMessage} />
      ) : (
        <p>No messages yet.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={onMessageChange}></input>
        <input type='submit' value={'Send Message'}></input>
      </form>
    </>
  );
}

function MessageList({ messages, removeMessage }) {
  return (
    <>
      {messages ? (
        <ul>
          {messages.map(message => (
            <MessageItem
              key={message.uid}
              message={message}
              removeMessage={removeMessage}
            />
          ))}
        </ul>
      ) : null}
    </>
  );
}

const MessageItem = ({ message, removeMessage }) => (
  <li>
    <strong>{message.userId || 'Unidentified User'}</strong>:{message.text}
    <button type='button' onClick={() => removeMessage(message.uid)}>
      X
    </button>
  </li>
);

export default withFirebase(Messages);
