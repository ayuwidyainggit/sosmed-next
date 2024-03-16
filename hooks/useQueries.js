import { useCallback, useEffect, useState } from "react";

export const useQueries = ({
  prefixUrl = "",
  headers: customHeaders = {},
} = {}) => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });

  const fetchingData = useCallback(
    async ({ url = "", method = "GET", headers: requestHeaders = {} }) => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const response = await fetch(url, {
          method,
          headers: { ...customHeaders, ...requestHeaders },
        });
        const result = await response.json();
        setData({
          ...data,
          data: result,
          isLoading: false,
        });
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
      }
    },
    [customHeaders]
  );

  useEffect(() => {
    if (prefixUrl) {
      fetchingData({ url: prefixUrl });
    }
  }, []);

  return { ...data };
};
