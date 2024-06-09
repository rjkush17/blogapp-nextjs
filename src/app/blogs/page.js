"use client";
import useGET from "@/hooks/useGET";
import { useEffect } from "react";
import Pagination from "../_components/Pagination";
import { useDispatch } from "react-redux";
import { fetchFav } from "@/lib/redux/slice/favSlice";
import { useSelector } from "react-redux";
import Loader from "@/app/_components/Loader";

export default function Page() {
  const dispatch = useDispatch();
  const { isError, isLoading, data, fetchGET } = useGET();
  const auth = useSelector((state) => state.auth.user);

  useEffect(() => {
    fetchGET("blogs");

    if (auth) {
      dispatch(fetchFav());
    }
  }, [auth]);

  return (
    <>
      <main className="">
        {isError && <p>{isError.error}</p>}
        {isLoading && <Loader />}
        {!isError && !isLoading && data && (
          <section>
            <div className="bg-zinc-100 text-center py-8 mobile:py-24 my-10 w-full ">
              <p className="text-4xl mobile:text-7xl mb-2 mobile:mb-6 font-noto">
                BLOGS
              </p>
              <p className="text-xl uppercase ">Home &gt; Blogs</p>
            </div>
            <Pagination data={data.blogs} items={6} />
          </section>
        )}
      </main>
    </>
  );
}