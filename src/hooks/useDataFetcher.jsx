import { useState, useEffect } from 'react';

/**
 * reusable hook to pull data from database, and update loading state
 * @param {function} node - the firebase API method that returns the ref from where data is being retrieved
 */
export const useDataFetcher = node => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    node().on('value', snapshot => {
      let retrieved = snapshot.val();
      if (retrieved) {
        //transform data object
        retrieved = Object.keys(retrieved).map(key => ({
          ...retrieved[key],
          uid: key
        }));
      }

      setData(retrieved);
      setLoading(false);
    });
    return () => {
      // cleanup
      node().off();
    };
  }, []);

  return {
    loading,
    setLoading,
    data,
    setData
  };
};
