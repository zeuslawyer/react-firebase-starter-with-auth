import { useState, useEffect } from 'react';

/**
 * reusable hook to pull data from database, and update loading state
 * @param {function} firebaseApi - the firebase API method relating to the node that returns the ref from where data is being retrieved
 */
export const useDataFetcher = (firebaseApi, pageLimit=5) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    console.log('deps test in data fetcher');
    firebaseApi()
      .orderByChild('createdAt')
      .limitToLast(pageLimit)
      .on('value', snapshot => {
        let retrieved = snapshot.val();
        if (retrieved) {
          //transform data object into an array of data objects with the message id added as property
          retrieved = Object.keys(retrieved)
            .map(id => ({
              ...retrieved[id],
              id
            }))
            .reverse();
        }

        setData(retrieved);
        setLoading(false);
      });
    // cleanup
    return () => {
      firebaseApi().off();
    };
  }, [firebaseApi]);

  return {
    loading,
    setLoading,
    data,
    setData
  };
};
