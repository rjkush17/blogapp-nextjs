import { useEffect, useState } from "react";

function useGET() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [controller, setController] = useState(null);

  const fetchGET = async (route, token = null) => {
    if (controller) {
      controller.abort();
    }
    const newController = new AbortController();
    setController(newController);

    setIsLoading(true);
    setIsError(null);
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`/api/${route}`, {
        headers: headers,
        signal: newController.signal
      });

      const resData = await res.json();

      if (!res.ok) {
        setIsLoading(false);
        setIsError(resData.error);
        return false;
      }
      setIsLoading(false);
      setIsError(null);
      setData(resData);
      return true;
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Fetching failed:", error);
        setIsError({ error: "Failed to fetch: request aborted" });
      } else {
        console.error("Fetching failed:", error);
        setIsError({ error: "Failed to fetch API" });
      }
      setIsLoading(false);
      return false;
    }
  };

  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return { isError, isLoading, data, fetchGET };
}

export default useGET;
