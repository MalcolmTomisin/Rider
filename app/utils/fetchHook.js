import React, {useState, useEffect} from 'react';

export const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  setIsLoading(true);
  useEffect(() => {
    setIsLoading(true);
    fetch(url, options)
      .then((res) => res.json())
      .then(setResponse)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, []);
  return {response, error, isLoading};
};
