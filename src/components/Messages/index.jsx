import React from 'react';

import withFirebase from '../../services/firebase/FirebaseContextHOC';
import { useDataFetcher } from '../../hooks/useDataFetcher';
import { useFormInputHook } from '../../hooks/formInputHook';

function Messages(props) {
  const { loading, setLoading, data, setData } = useDataFetcher(
    props.firebase._allMessages
  );

  // destructure and rename for clarity
  const {
    value: message,
    setValue: setMessage,
    onChange: onMessageChange,
    reset: resetMessageInput
  } = useFormInputHook();

  const handleSubmit = e => {
    e.preventDefault();
    props.firebase
      ._allMessages()
      .push({ text: message, userId: props.user.uid })
      .then(() => resetMessageInput())
      .catch(e => console.error(e));
  };

  return (
    <>
      {loading && 'Loading messages...'}
      {data && <MessageList messages={data} />}
      <form onSubmit={handleSubmit}>
        <input type='text' value={message} onChange={onMessageChange}></input>
        <input type='submit' value={'Send Message'}></input>
      </form>
    </>
  );
}

function MessageList(props) {
  return (
    <>
      {props.messages ? (
        <ul>
          {props.messages.map(message => (
            <MessageItem key={message.uid} message={message} />
          ))}
        </ul>
      ) : (
        <p>No messages yet.</p>
      )}
    </>
  );
}

const MessageItem = props => (
  <li>
    <strong>{props.message.userId || 'Unidentified User'}</strong>:{' '}
    {props.message.text}
  </li>
);

export default withFirebase(Messages);
