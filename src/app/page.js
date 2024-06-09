"use client";
import useGET from "@/hooks/useGET";
import Fivblog from "@/app/_components/home/FiveBlog";
import Popularblogs from "@/app/_components/home/Popularblog";
import CategoryBlog from "@/app/_components/home/Category";
import Health from "/public/home/health.jpg";
import { fetchFav } from "@/lib/redux/slice/favSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import Loader from "@/app/_components/Loader"



export default function Home() {
  const dispatch = useDispatch();
  const { isError, isLoading, data, fetchGET } = useGET();
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchGET("home");
    if (auth) {
      dispatch(fetchFav());
    }
  }, []);

  return (
    <main className="w-11/12 mx-auto">
      {isLoading && <Loader/>}
      {isError && <p>{isError}</p>}
      {data && (
        <>
                 

          <Fivblog blog={data.home_data.random} />
          <Popularblogs blog={data.home_data.featured} />
          <CategoryBlog blog={data.home_data.health} Health={Health} />
          <CategoryBlog blog={data.home_data.travel} Health={Health} />
        </>
      )}
    </main>
  );
}
