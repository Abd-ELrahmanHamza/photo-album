// ts-check

// Import hooks
import { useState, useEffect } from "react";

/**
 * This is a custom hook to fetch data from an API
 *
 * @param {String} url  The url to fetch data from
 * @returns {Object}  An object containing the data, loading status and error
 */
const useFetch = (url) => {
  //   State used to store fetched data
  const [data, setData] = useState(null);

  //   State used to indicate is fetching has ended or not
  const [isPending, setIsPending] = useState(true);

  //   state used to store error messages
  const [error, setError] = useState(null);

  useEffect(() => {
    /**
     * This function is used to check if the response is ok or not
     *
     * @param {promise} response  The response from the API
     * @returns {promise}  A promise containing the data from the API
     */
    const fetchResponse = (response) => {
      // If there is an error throw error with proper message
      if (!response.ok) {
        throw Error("Couldn't fetch data please try again");
      }
      return response.json();
    };

    /**
     * This function is used to set the data, loading status and error
     *
     * @param {Object} data  The data from the API
     */
    const setResponse = (data) => {
      //  Set data state to fetched data
      setData(data);
      //   Set isPending state to false (fetching has ended)
      setIsPending(false);
      //   Set error to null
      setError(null);
    };

    /**
     *
     * @param {Object} error  The error object
     */
    const handleFetchError = (error) => {
      if (error.name === "AbortError") return;
      // set error to thrown error message
      setError(error.message);
      //   Set isPending state to false (fetching has ended)
      setIsPending(false);
    };

    const abortController = new AbortController();

    fetch(url, { signal: abortController.signal })
      .then(fetchResponse)
      .then(setResponse)
      .catch(handleFetchError);

    return () => abortController.abort();
  }, [url]);

  return { data, isPending, error };
};

export default useFetch;
