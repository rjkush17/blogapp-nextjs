import Image from "next/image";
import React from "react";
import { useRouter } from 'next/navigation'


function Popularblogs({ blog }) {
  const router = useRouter()
  console.log(blog)

  return (
    <>
      <h1 className="my-10">Popular Stories</h1>
      <section className="flex flex-col tablet:flex-row gap-8 h-auto tablet:h-[575px] overflow-hidden ">
        <div className="basis-[50%] desktop:basis-[35%] overflow-hidden relative group aspect-square mobile:aspect-video tablet:aspect-auto h-full cursor-pointer"  onClick={() => router.push(`/blogs/${blog[1]._id}`)}>
          <Image
            src={blog[0].featured_img}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="h-full w-full object-cover scale-125 group group-hover:scale-100 transition-all duration-500"
          />
          <div className="absolute top-0  bg-transparent w-full h-full text-white px-4 mobile:px-8 py-4 mobile:py-10 flex flex-col justify-between group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
            <div className="mt-2 tablet:mt-8 w-full border-l-4 border-white pl-4 text-xl opacity-0 group-hover:opacity-100 transition-all">
              <p>{blog[0].description}</p>
            </div>
            <div>
              <p className="font-noto uppercase">{blog[0].category}</p>
              <h2 className="">{blog[0].title}</h2>
            </div>
          </div>
        </div>



        <div className="group relative"  onClick={() => router.push(`/blogs/${blog[0]._id}`)}>
        <div className="basis-[50%] desktop:basis-[65%] overflow-hidden aspect-square mobile:aspect-video tablet:aspect-auto h-full cursor-pointer">
          <Image
            src={blog[2].featured_img}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="h-full w-full object-cover scale-125 group group-hover:scale-100 transition-all duration-500"
          />
        </div>
        <div className="absolute top-0  bg-transparent w-full h-full text-white px-4 mobile:px-8 py-4 mobile:py-10 flex  cursor-pointer flex-col justify-between group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
            <div className="mt-2 tablet:mt-8 w-full tablet:w-6/12 border-l-4 border-white pl-4 text-xl opacity-0 group-hover:opacity-100 transition-all">
              <p>{blog[2].description}</p>
            </div>
            <div>
              <p className="font-noto uppercase">{blog[2].category}</p>
              <h2 className="">{blog[2].title}</h2>
            </div>
          </div>
        </div>
      </section>



      <section className="aspect-square mobile:aspect-auto">
        <div className="group relative auto" onClick={() => router.push(`/blogs/${blog[2]._id}`)}>
          <div className="h-96 mt-8 overflow-hidden relative">
            <Image
              src={blog[3].featured_img}
              width={900}
              height={900}
              priority={true}
              alt="Blog Image"
              className="h-full w-full object-cover scale-125 group group-hover:scale-100 transition-all duration-500"
            />
          </div>
          <div className="absolute top-0  bg-transparent  cursor-pointer w-full h-full text-white px-4 mobile:px-8 py-4 mobile:py-10 flex flex-col justify-between group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
            <div className="mt-2 w-full tablet:w-6/12 border-l-4 border-white pl-4 text-xl opacity-0 group-hover:opacity-100 transition-all">
              <p>{blog[3].description}</p>
            </div>
            <div>
              <p className="font-noto uppercase">{blog[3].category}</p>
              <h2 className="">{blog[3].title}</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col mt-16 tablet:flex-row gap-8 h-auto tablet:h-[600px] overflow-hidden" >
        <div className="h-full  basis-[50%] desktop:basis-[55%] aspect-square tablet:aspect-auto" >
        <Image
              src={blog[1].featured_img}
              width={900}
              height={900}
              priority={true}
              alt="Blog Image"
              className="h-full w-full object-cover"
            />
        </div>
        <div className="h-full basis-[50%] desktop:basis-[45%] bg-pink-100 py-12 tablet:py-28  px-12 tablet:px-24 ">
          <h1 className="font-EB tracking-wide">{blog[1].title}</h1>
          <h3 className="text-lg tablet:text-2xl font-medium mt-6">Let’s Discover more about your next destination</h3>
         <div className="text-center">
         <button className="mt-8 button bg-black text-white"  onClick={() => router.push(`/blogs/${blog[1]._id}`)}>Read full story</button>
         </div>
        </div>
      </section>
    </>
  );
}

export default Popularblogs;
