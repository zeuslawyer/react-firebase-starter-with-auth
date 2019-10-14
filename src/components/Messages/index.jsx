import React from 'react';

import withFirebase from '../../services/firebase/FirebaseContextHOC';
import { useDataFetcher } from '../../hooks/useDataFetcher';

function Messages(props) {
  const { loading, setLoading, data, setData } = useDataFetcher(props);
  console.log(data);
  return (
    <>
      {loading && 'Loading...'}
      {!loading && <MessageList messages={data || []} />}
    </>
  );
}

function MessageList(props) {
  return (
    <>
      {props.messages.length === 0 && <> No data yet </>}
      <ul>
        {props.messages.map((msg, ind) => (
          <MessageItem key={msg.uid} message={msg} />
        ))}
      </ul>
    </>
  );
}

const MessageItem = props => (
  <li>
    <strong>{props.message.userId}</strong>: {props.message.text}
  </li>
);

export default withFirebase(Messages);
