import React from "react";
import { useEffect } from "react";
import useGET from "@/hooks/useGET";
import Pagination from "../_components/Pagination";

function auth({ id, token }) {
  const { isError, isLoading, data, fetchGET } = useGET();

  useEffect(() => {
    fetchGET(`favorites/${id}`, token);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{isError.error}</p>;
  }
  if (data && data.blogs == undefined) {
    return <p>Zero fav found</p>;
  }
 if(data){
  return (
    <main className="">
      <section>
        <div className="bg-zinc-100 text-center py-8 mobile:py-24 my-10 w-full ">
          <p className="text-4xl mobile:text-7xl mb-2 mobile:mb-6 font-noto">
            BLOGS
          </p>
          <p className="text-xl uppercase ">Home &gt; Blogs &gt; Favorites</p>
        </div>
        {console.log(data.blogs)}
          <Pagination data={data.blogs} items={6}/>
      </section>
    </main>
  );
 }
}

export default auth;
