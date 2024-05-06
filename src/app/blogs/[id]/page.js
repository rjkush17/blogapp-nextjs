"use client";
import useGET from "@/hooks/useGET";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

function page() {
  const { isError, isLoading, data, fetchGET } = useGET();
  const params = useParams();

  useEffect(() => {
    console.log("Fetching with ID:", params.id);
    fetchGET(`blogs/${params.id}`);
  }, []);

  let filterdata;
  if (data) {
    filterdata = data.suggestion.filter((val) => val._id !== data.blogs[0]._id);
    console.log(filterdata);
  }

  return (
    <main className="w-11/12 mobile:w-10/12 mx-auto">
      {isError && <p>{isError.error}</p>}
      {isLoading && <p>loading...</p>}

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
          <Image
            src={data.blogs[0].img}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="w-fit mx-auto my-8"
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
            <h4 className="font-EB my-1 mobile:my-4 underline">{filterdata[0].title}</h4>
          </div>
          <div className="max-w-96 text-start mobile:text-end">
            <p className="font-noto">NEXT</p>
            <h4 className="font-EB my-1 mobile:my-4 underline">{filterdata[1].title}</h4>
          </div>
        </div>
      )}

      {/* review system */}
      {data && (
        <section>
          <h5 className="text-3xl font-EB mt-16">Comments</h5>

          {data.blogs[0].reviews.map((val, ind) => (
            <div key={ind} className="flex  overflow-hidden my-4 items-center gap-8 mb-8">
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
                  {val.profile} {"  "} <span className="text-gray-400 ml-4">{val.date.day} {val.date.month} {val.date.year}</span>
                </h6>
                <p>{val.review}</p>
              </div>
            </div>
          ))}
        </section>
      )}
    </main>
  );
}

export default page;