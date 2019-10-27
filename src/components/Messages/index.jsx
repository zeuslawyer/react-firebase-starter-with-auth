import React from 'react';

import withFirebase from '../../services/firebase/FirebaseContextHOC';
import { useDataFetcher } from '../../hooks/useDataFetcher';
import { useFormInputHook } from '../../hooks/formInputHook';

function Messages({ firebase, user }) {
  const { loading, data } = useDataFetcher(firebase._allMessages);

  // destructure form input hook exported vars and rename for clarity
  const {
    value: input,
    onChange: onMessageChange,
    reset: resetMessageInput
  } = useFormInputHook();

  const handleSubmit = e => {
    e.preventDefault();

    firebase
      ._allMessages()
      .push({
        text: input,
        userId: user.uid,
        createdAt: firebase.serverValue.TIMESTAMP
      })
      .then(() => resetMessageInput())
      .catch(e => console.error(e));
  };

  const removeMessage = id => {
    firebase._message(id).remove();
  };

  const updateMessage = (currentMsgData, updatedMessageText) => {
    const { id, ...restOfCurrentMsgData } = currentMsgData;

    firebase._message(id).set({
      ...restOfCurrentMsgData,
      text: updatedMessageText,
      updatedAt: firebase.serverValue.TIMESTAMP
    });
  };

  return (
    <>
      {loading ? (
        'Loading messages...'
      ) : data ? (
        <MessageList
          messages={data}
          removeMessage={removeMessage}
          updateMessage={updateMessage}
        />
      ) : (
        <p>No messages yet.</p>
      )}
      <form onSubmit={handleSubmit}>
        <input type='text' value={input} onChange={onMessageChange}></input>
        <input type='submit' value={'Send Message'}></input>
      </form>
    </>
  );
}

function MessageList({ messages, removeMessage, updateMessage }) {
  return (
    <>
      {messages ? (
        <ul>
          {messages.map(message => (
            <MessageItem
              key={message.id}
              message={message}
              removeMessage={removeMessage}
              updateMessage={updateMessage}
            />
          ))}
        </ul>
      ) : null}
    </>
  );
}

const MessageItem = ({ message, removeMessage, updateMessage }) => {
  const [editMode, setEditMode] = React.useState(false);

  // destructure form input hook exported vars and rename for clarity
  const {
    value: updatedMessage,
    onChange: onChangeMessageText
  } = useFormInputHook(message.text); // initial value is the message in its current state

  // toggle editable state for message
  const onToggleEditMode = () => {
    setEditMode(!editMode);
  };

  // save edited message
  const submitUpdatedMessage = () => {
    updateMessage(message, updatedMessage);
    setEditMode(false);
  };

  return (
    <li>
      {!editMode ? (
        <span>
          <strong>{message.userId || 'Unidentified User'}</strong>:
          {message.text}
          {message.updatedAt && (
            <span>
              <small>
                <i>(Edited)</i>
              </small>
            </span>
          )}
          <button type='button' onClick={() => removeMessage(message.id)}>
            X
          </button>
          <button onClick={onToggleEditMode}>Update</button>
        </span>
      ) : (
        <span>
          <strong>{message.userId || 'Unidentified User'}</strong>:{' '}
          <input
            type='text'
            value={updatedMessage}
            onChange={onChangeMessageText}
          />
          <button type='button' onClick={submitUpdatedMessage}>
            Update
          </button>
          <button onClick={onToggleEditMode}>Cancel Update</button>
        </span>
      )}
    </li>
  );
};

export default withFirebase(Messages);
