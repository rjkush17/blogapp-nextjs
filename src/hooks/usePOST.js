import { useEffect, useState } from "react";

function usePOST() {
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [controller, setController] = useState(null);

  const fetchPOST = async (route, bodyData, token = null) => {
    // If controller is set, then it cancels the previous API request
    if (controller) {
      controller.abort();
    }
    // Set new controller
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
        method: "POST",
        headers: headers,
        body: JSON.stringify(bodyData),
        signal: newController.signal,
      });

      const resData = await res.json();

      if (!res.ok) {
        setIsLoading(null);
        setIsError(resData);
        return;
      }
      
      setIsLoading(null);
      setIsError(null);
      setData(resData);
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("Fetching failed", error);
        setIsError({ error: "Failed to fetch API abort" });
        setIsLoading(null);
        return false;
      } else {
        console.error("Fetching failed", error);
        setIsError({ error: "Internal Server error" });
        setIsLoading(null);
        return false;
      }
    }
  };

  // Clean up the abort controller when the component unmounts
  useEffect(() => {
    return () => {
      if (controller) {
        controller.abort();
      }
    };
  }, [controller]);

  return { isError, isLoading, data, fetchPOST };
}

export default usePOST;
