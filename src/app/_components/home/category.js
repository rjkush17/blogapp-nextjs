import Image from "next/image";
import BlogCard from "@/app/_components/BlogCard";

function category({ blog, Health }) {
  return (
    <section>
      <h1 className="mt-12">{blog[0].category}</h1>
      <div className="flex mt-4 h-auto tablet:h-[600px] overflow-hidden flex-col-reverse tablet:flex-row">
        <div className="h-full flex flex-col justify-around basis-[50%] desktop:basis-[40%] bg-black text-white py-12 tablet:py-16 px-12 tablet:px-24 aspect-video tablet:aspect-auto">
          <h1 className="font-EB tracking-wide">{blog[3].title}</h1>
          <h3 className="text-xl tablet:text-2xl font-medium mt-6">
            Let’s Discover more about your next destination
          </h3>
          <div className="text-center">
            <button className="mt-8 text-white bg-orange-600">
              Read full story
            </button>
          </div>
        </div>
        <div className="h-full basis-[50%] desktop:basis-[60%] aspect-video tablet:aspect-auto group relative overflow-hidden">
          <Image
            src={blog[0].img}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="h-full w-full object-cover scale-125 group-hover:scale-100 transition-all duration-500"
          />
             <div className="absolute top-0  bg-transparent w-full h-full text-white px-4 mobile:px-8 py-4 mobile:py-10 flex flex-col justify-between group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
            
       
            </div>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 h-full">
        <BlogCard data={blog[1]} />
        <BlogCard data={blog[2]} />
        <BlogCard data={blog[3]} />
      </div>
    </section>
  );
}

export default category;
