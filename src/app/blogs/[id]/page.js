"use client";
import useGET from "@/hooks/useGET";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/app/_components/Loader";
import { fetchFav } from "@/lib/redux/slice/favSlice";
import Fav from "@/app/_components/Fav"

function page() {
  const { isError, isLoading, data, fetchGET } = useGET();
  const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    fetchGET(`blogs/${params.id}`);

    if (auth) {
      dispatch(fetchFav());
    }
  }, [auth]);

  let filterdata;
  if (data) {
    filterdata = data.suggestion.filter((val) => val._id !== data.blogs[0]._id);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!auth) {
      toast.error("Login first for Review", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      toast.info("Review Submitted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <main className="w-11/12 mobile:w-10/12 mx-auto">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {isError && <p>{isError.error}</p>}
      {isLoading && <Loader />}

      {/* Main Blog body */}

      {data && (
        <section className="w-full tablet:w-10/12 mx-auto text-center">
          <p className="mt-16 mobile:mt-28 font-noto upppercase">
            BY <strong>{data.blogs[0].author}</strong> on{" "}
            {data.blogs[0].category} from {data.blogs[0].date.day}{" "}
            {data.blogs[0].date.month} {data.blogs[0].date.year}
          </p>
          

          <h1 className="my-12 text-xl mobile:text-4xl font-noto upppercase">
            {data.blogs[0].title}
          </h1>
          <h2 className="mt-12 text-lg mobile:text-xl">
            {data.blogs[0].description}
          </h2>
          <div className="w-fit ml-auto mt-4">
            {" "}
            <Fav className="ml-auto" id={data.blogs[0]._id} />
          </div>
          <Image
            src={data.blogs[0].img}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="w-fit mx-auto mb-8 mt-4"
          />
          <div>
            {data.blogs[0].content.map((val, ind) => (
              <p
                className="indent-10 mobile:indent-20	mb-8 mobile:mb-10 text-start"
                key={ind}
              >
                {val} "Sed ut perspiciatis unde omnis iste natus error sit
                voluptatem accusantium doloremque laudantium, totam rem aperiam,
                eaque ipsa quae ab illo inventore veritatis et quasi architecto
                beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem
                quia voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor
                sit amet, consectetur, adipisci velit, sed quia non numquam eius
                modi tempora incidunt ut labore et dolore magnam aliquam quaerat
                voluptatem. Ut enim ad minima veniam, quis nostrum
                exercitationem ullam corporis suscipit laboriosam, nisi ut
                aliquid ex ea commodi consequatur? Quis autem vel eum iure
                reprehenderit qui in ea voluptate velit esse quam nihil
                molestiae consequatur, vel illum qui dolorem eum fugiat quo
                voluptas nulla pariatur
              </p>
            ))}
          </div>
        </section>
      )}
      {/* previous / next button */}
      {data && (
        <div className="w-full flex flex-col mobile:flex-row justify-between mb-12 gap-8">
          <div className=" max-w-96 text-start">
            <p className="font-noto">PREVIOUS</p>
            <h4
              className="font-EB my-1 mobile:my-4 underline"
              onClick={() => router.push(`/blogs/${filterdata[0]._id}`)}
            >
              {filterdata[0].title}
            </h4>
          </div>
          <div className="max-w-96 text-start mobile:text-end">
            <p className="font-noto">NEXT</p>
            <h4
              className="font-EB my-1 mobile:my-4 underline"
              onClick={() => router.push(`/blogs/${filterdata[1]._id}`)}
            >
              {filterdata[1].title}
            </h4>
          </div>
        </div>
      )}

      {/* review system */}
      {data && (
        <section>
          <h5 className="text-3xl font-EB mt-16">Comments</h5>

          {data.blogs[0].reviews.map((val, ind) => (
            <div
              key={ind}
              className="flex overflow-hidden my-4 items-center gap-8 mb-8"
            >
              <div className="min-w-16 min-h-16 max-w-16 max-h-16 aspect-square overflow-hidden rounded-full">
                <Image
                  src={val.img}
                  width={110}
                  height={110}
                  priority={true}
                  alt="Blog Image"
                  className=" h-full w-full object-cover "
                />
              </div>
              <div>
                <h6>
                  {" "}
                  {val.profile} {"  "}{" "}
                  <span className="text-gray-400 ml-4">
                    {val.date.day} {val.date.month} {val.date.year}
                  </span>
                </h6>
                <p>{val.review}</p>
              </div>
            </div>
          ))}
          <div className="w-full">
            <h5 className="text-3xl font-EB mt-16">leave a Comments</h5>
            <form onSubmit={handleSubmit}>
              <div className="w-full flex flex-col mobile:flex-row gap-6 mb-6">
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  required
                  className="w-full shadow-lg rounded	p-2"
                />
                <input
                  type="text"
                  placeholder="Enter title"
                  required
                  className="w-full shadow-lg	rounded py-1 px-4"
                />
              </div>
              <textarea
                className="w-full h-24 shadow-lg	rounded py-1 px-4 mt-6"
                placeholder="Write your Commet Here"
              />
              <div className="my-3 flex items-center gap-2">
                <input type="checkbox" />
                <label>
                  {" "}
                  Save my name, email, and website in this browser for the next
                  time I comment.
                </label>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-6 my-4 rounded bg-slate-900 text-white"
              >
                {" "}
                Submit
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}

export default page;
