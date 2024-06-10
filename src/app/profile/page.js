"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import profile from "/public/profile/profile.jpg";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slice/authSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  const notify = () =>
    toast.warn("This feature coming soon", {
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

  const auth = useSelector((state) => state.auth.user);
  let user;
  if (auth) {
    user = auth.details.user;
  }

  useEffect(() => {
    setIsMounted(true);
  }, [auth]);

  if (!isMounted) {
    return null;
  }
  if (!auth) {
    return (
      <main className="w-9/12 mx-auto text-center my-8">
        <h2 className="text-noto">Oops! You need to be logged in to access this page.</h2>
        <p className="mt-8">Please log in to your account to continue. If you don&apos;t have an account, you can sign up in just a few minutes.</p>
        <button className="button bg-orange-400 text-white mb-32" onClick={()=>router.push("/auth")}>SignIn/SignUp</button>
      </main>
    );
  }
  if (auth) {
    return (
      <main className="w-full mobile:w-11/12 tablet:w-8/12 mx-auto">
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
            <button
              className="button_sm bg-blue-300 text-white"
              onClick={() => router.push("/favorite")}
            >
              Saved Blogs
            </button>
            <button
              className="button_sm bg-green-300 text-white"
              onClick={notify}
            >
              Edit Profile
            </button>
            <button className="button_sm bg-red-500 text-white" onClick={()=>dispatch(logout())}>logout</button>
          </div>
        </section>
      </main>
    );
  }
}

export default Page;
