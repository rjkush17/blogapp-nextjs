import Image from "next/image";
import { useRouter } from 'next/navigation'
import Fav from "./Fav"

function BlogCard({ data }) {

  const router = useRouter()


  return (
    <section className="max-w-[500px] mx-auto">
      <div className="aspect-[6/4] overflow-hidden group relative cursor-pointer">
        <Image
          src={data.img}
          width={900}
          height={900}
          priority={true}
          alt="Blog Image"
          className="h-full w-full object-cover scale-125 group-hover:scale-100 transition-all duration-500"
        />
           <div className="absolute top-0  bg-transparent w-full h-full text-white px-4 mobile:px-8 py-4 mobile:py-10 flex flex-col justify-between group-hover:bg-[rgba(0,0,0,0.3)] transition-all">
            
       
          </div>
      </div>
      <div className="flex flex-col overflow-hidden">
        <p className="my-3">
          In {data.category} from {data.date.day} {data.date.month}{" "}
          {data.date.year}
        </p>
        <h3>{data.title}</h3>
        <div className="flex justify-between">
        <button  onClick={() => router.push(`/blogs/${data._id}`)}
          className="my-4 rounded-full text-black bg-white hover:text-white hover:bg-black font-noto py-3 px-6 text-lg font-normal border-black border w-fit uppercase transition-all">
          Read more
        </button>
        <Fav id={data._id}/>
        </div>
      </div>
    </section>
  );
}

export default BlogCard;
