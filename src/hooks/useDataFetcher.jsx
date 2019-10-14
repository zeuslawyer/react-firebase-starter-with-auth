import { useState, useEffect } from 'react';

export const useDataFetcher = props => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    props.firebase._allMessages().on('value', snapshot => {
      setData(snapshot.val());
      setLoading(false);
    });
    return () => {
      // cleanup
      props.firebase._allMessages().off();
    };
  }, []);

  return {
    loading,
    setLoading,
    data,
    setData
  };
};
