import { useState, useEffect } from "react";

const useFetch = (url) => {
  //   State used to store fetched data
  const [data, setData] = useState(null);

  //   State used to indicate is fetching has ended or not
  const [isPending, setIsPending] = useState(true);

  //   state used to store error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResponse = (response) => {
      // If there is an error throw error with proper message
      if (!response.ok) {
        throw Error("Couldn't fetch data please try again");
      }
      return response.json();
    };

    const setResponse = (data) => {
      //  Set data state to fetched data
      setData(data);
      //   Set isPending state to false (fetching has ended)
      setIsPending(false);
      //   Set error to null
      setError(null);
    };

    const handleFetchError = (error) => {
      if (error.name === "AbortError") return;
      // set error to thrown error message
      setError(error.message);
      //   Set isPending state to false (fetching has ended)
      setIsPending(false);
    };

    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then(fetchResponse)
        .then(setResponse)
        .catch(handleFetchError);
    }, 1000);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
