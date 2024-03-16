import { useCallback, useState } from "react";
import Cookies from "js-cookie";

export const useMutation = () => {
  const [data, setData] = useState({
    data: null,
    isLoading: false,
    isError: false,
  });
  const token = Cookies.get("user_token");
  const mutate = useCallback(
    async ({ url = "", method = "POST", payload = {}, headers = {} }) => {
      setData({
        ...data,
        isLoading: true,
      });
      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...headers,
          },
          ...(method !== "GET" && { body: JSON.stringify(payload) }),
        });
        const result = await response.json();
        setData({
          ...data,
          data: result,
          isLoading: false,
        });
        return { ...result };
      } catch (error) {
        setData({
          ...data,
          isError: true,
          isLoading: false,
        });
        return error;
      }
    },
    []
  );

  return { ...data, mutate };
};
