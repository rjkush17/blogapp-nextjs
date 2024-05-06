import { useEffect, useState } from "react";

function useGET() {
  const [isLoading, setIsLoading] = useState(null);
  const [isError, setIsError] = useState(null);
  const [data, setData] = useState(null);
  const [controller, setController] = useState(null);

  const fetchGET = async (route) => {
    //if controller is set then it cancel the previouse API request
    if (controller) {
      controller.abort();
    }
    //set new controller of controller
    const newController = new AbortController();
    setController(newController);

    setIsLoading(true);
    setIsError(null);
    try {
      //set current set controller signle to this fetch request
      const res = await fetch(`/api/${route}`, { signal: newController.signal });
      const resData = await res.json();

      if (!res.ok) {
        setIsLoading(null);
        setIsError(resData.error);
        return false;
      }
      setIsLoading(null);
      setIsError(null);
      setData(resData);
      return true;
    } catch (error) {
      if (error.name == "AbortError") {
        console.error("Fetching failed", error);
        setIsError({error:"Failed to fetch API abort"});
        setIsLoading(null);
        return false;
      } else {
        console.log("fecthing failed");
        setIsError({error:"Failed to fetch API"});
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
  return { isError, isLoading, data, fetchGET };
}
export default useGET;