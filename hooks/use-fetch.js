import { useMemo, useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url, method = "GET", options = {}) => {
  const optionsStr = JSON.stringify(options);
  const requestOptions = useMemo(() => {
    const currOptions = { ...options };
    if (method === "POST" && !currOptions.data) {
      currOptions.data = {};
    }
    return currOptions;
  }, [method, optionsStr]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refreshIndex, setRefreshIndex] = useState(0);
  useEffect(() => {
    const apiCall = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data: response } = await axios({
          method,
          url,
          ...requestOptions,
        });
        if (!response.success) {
          throw new Error(response.message);
        }
        setData(response);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    apiCall();
  }, [url, requestOptions, refreshIndex]);
  const refetch = () => {
    setRefreshIndex((prev) => prev + 1);
  };
  return { loading, error, data, refetch };
};

export default useFetch;
