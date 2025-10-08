import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const coinData = await res.json();
          setData(coinData);
          setLoading(false);
        } else {
          setLoading(false);
          setIsError(true);
        }
      } catch (errr) {
        setLoading(false);
        setIsError(true);
      }
    };

    fetchData();
  }, [url]);

  return { loading, isError, data };
};
