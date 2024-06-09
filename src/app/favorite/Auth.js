import React from "react";
import { useEffect } from "react";
import useGET from "@/hooks/useGET";
import Pagination from "../_components/Pagination";
import Loader from "@/app/_components/Loader";
import { useRouter } from "next/navigation";


function Auth({ id, token }) {
  const { isError, isLoading, data, fetchGET } = useGET();
  const router = useRouter();


  useEffect(() => {
    fetchGET(`favorites/${id}`, token);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <p>{isError.error}</p>;
  }
  if (data && data.blogs == undefined) {
    return (
      <main className="w-9/12 mx-auto text-center my-8">
        <h2 className="text-noto">
        No Favorite Blogs Yet
        </h2>
        <p className="mt-8">
        Start exploring and add blogs to your favorites to see them here.
        </p>
        <button
          className="button bg-orange-400 text-white mb-32"
          onClick={() => router.push("/blogs")}
        >
          Explore Blogs
        </button>
      </main>
    );
  }
  if (data) {
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
          <Pagination data={data.blogs} items={6} />
        </section>
      </main>
    );
  }
}

export default Auth;
