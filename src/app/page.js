"use client";
import useGET from "@/hooks/useGET";
import Fivblog from "@/app/_components/home/fiveBlog"
import Popularblogs from "@/app/_components/home/popularblog"
import CategoryBlog from "@/app/_components/home/category"
import Health from "/public/home/health.jpg";

import { useEffect } from "react";

export default function Home() {
  const { isError, isLoading, data, fetchGET } = useGET();

  useEffect(() => {
    fetchGET("home");
  }, []);

  return (
    <main className="w-11/12 mx-auto">
      {isLoading && <p>Loading ....</p>}
      {isError && <p>{isError}</p>}
      {data && <>
        <Fivblog blog={data.home_data.random}/>
        <Popularblogs blog={data.home_data.featured} />
        <CategoryBlog blog={data.home_data.health} Health={Health} />
        <CategoryBlog blog={data.home_data.travel} Health={Health} />
        
      </>
       
    
       }
    </main>
  );
}
