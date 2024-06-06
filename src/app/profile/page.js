"use client";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "/public/profile/profile.jpg"

function page() {
  const [isMounted, setIsMounted] = useState(false);

  const auth = useSelector((state) => state.auth.user);
  let user;
  if (auth) {
    console.log(auth.details.user);
    user = auth.details.user;
  }

  useEffect(() => {
    setIsMounted(true);
  }, [auth]);

  if (!isMounted) {
    return null;
  }
  if (!auth) {
    <p className="mx-4"> user not login yet</p>;
  }
  if (auth) {
    return (
      <main className="w-full mobile:w-11/12 tablet:w-8/12 mx-auto">
        <h1 className="mx-4 mt-8">My Details</h1>
        <section className="pb-24 shadow-2xl my-0 mobile:my-8 rounded px-2 mobile:px-8 py-4 mobile:py-10 font-EB text-sm mobile:text-xl">
          <div className="w-64 aspect-square mx-auto rounded-full overflow-hidden mb-8">
            <Image
              src={profile}
              alt="Blog Image"
              width={800}
              height={1800}
              priority={true}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="grid grid-cols-2 gap-2 mobile:gap-4 m-6">
            <div className="font-bold">Name :</div>
            <div className="pl-1 mobile:pl-4">
              {user.firstname} {user.lastname}
            </div>

            <div className="font-bold">Email :</div>
            <div className="pl-1 mobile:pl-4">{user.email}</div>

            <div className="font-bold">User ID :</div>
            <div className="pl-1 mobile:pl-4">{user._id}</div>

            <div className="font-bold">Subscribed :</div>
            <div className="pl-1 mobile:pl-4">No</div>
          </div>

          <div className="flex gap-4 justify-evenly flex-wrap">
            <button className="button_sm bg-blue-300 text-white">
              Saved Blogs
            </button>
            <button className="button_sm bg-green-300 text-white">
              Edit Profile
            </button>
            <button className="button_sm bg-red-500 text-white">logout</button>
          </div>
        </section>
      </main>
    );
  }
}

export default page;
