"use client";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFav } from "@/lib/redux/slice/favSlice";
import useGET from "@/hooks/useGET";
import Pagination from "../_components/Pagination";

function Page() {
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { isError, isLoading, data, fetchGET } = useGET();

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        const ID = auth.details.user._id;
        const token = auth.token;
        await fetchGET(`favorites/${ID}`, token);
        dispatch(fetchFav());
      };

      fetchData();
    }
  }, [auth]);

  if (!auth) {
    return <p>Login to view this page</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>{isError.error}</p>;
  }

  if (auth && !data) {
    return <p>Zero favorites found</p>;
  }

    return (
      <main className="">
        <section>
          <div className="bg-zinc-100 text-center py-8 mobile:py-24 my-10 w-full ">
            <p className="text-4xl mobile:text-7xl mb-2 mobile:mb-6 font-noto">
              BLOGS
            </p>
            <p className="text-xl uppercase ">
              Home &gt; Blogs &gt; Favorites
            </p>
          </div>{console.log(data.blogs)}
          <Pagination data={data.blogs} itemsPerPage={6} />
        </section>
      </main>
    );
  }

export default Page;
