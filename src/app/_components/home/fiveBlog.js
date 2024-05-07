import React from 'react'
import Image from "next/image";
import { useRouter } from 'next/navigation'


function fiveBlog({blog}) {
  const router = useRouter()

  return (
    <section className="flex flex-wrap laptop:flex-nowrap justify-center">
    {blog.map((val, ind)=>(
      <div key={ind} className="flex w-full mobile:max-w-72 laptop:w-auto flex-col overflow-hidden" onClick={() => router.push(`/blogs/${val._id}`)}>
        <Image  src={val.img}
        alt="Blog Image"
        width={800}
        height={1800}
        priority={true}
       
        className="scale-150  object-cover aspect-[8/2]" />
        <div className="flex  justify-center items-center h-full px-3 gap-2 pt-4 my-4 leading-8 cursor-pointer">
        <p className=" w-auto laptop:w-6/12 text-orange-600 text-6xl">{ind + 1}</p>
        <p className="text-pretty">{val.title}</p>
      </div>
      </div>
    ))}

    
  </section>
  )
}

export default fiveBlog