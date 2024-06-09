import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaUserAlt, FaLock } from "react-icons/fa";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useDispatch } from "react-redux";
import { login } from "@/lib/redux/slice/authSlice";
import usePOST from "@/hooks/usePOST";
import LoginIMG from "/public/auth/login.jpg";
import 'react-toastify/dist/ReactToastify.css'; 

function Login({ toggleScreen }) {
  const dispatch = useDispatch();
  const { isError, isLoading, data, fetchPOST } = usePOST();
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetchPOST("auth/login", formValue);
  };

  useEffect(() => {
    if (data) {
      dispatch(login(data.token));
    }
    if (isError) {
      toast.error(isError.error, {
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
  }, [data, isError, dispatch]); 

  return (
    <main className="bg-gray-100 py-0 tablet:py-24 w-screen overflow-hidden">
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
      <section className="max-w-full tablet:max-w-[900px] mx-auto flex bg-white py-24">
        <div className="basis-2/4 ml-auto hidden tablet:block">
          <Image
            src={LoginIMG}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            className="w-8/12 object-cover mx-auto"
          />
          <p
            className="text-center text-lg underline cursor-pointer"
            onClick={() => toggleScreen()}
          >
            Create an Account
          </p>
        </div>
        <div className="basis-full mobile:basis-3/4 tablet:basis-2/4 mx-auto px-16">
          <form onSubmit={handleSubmit}>
            <h1 className="font-EB font-bold mb-10">Login</h1>
            <div className="flex border-b-2 border-gray-500 py-1 items-center my-8">
              <label>
                <FaUserAlt className="mr-2 text-lg" />
              </label>
              <input
                type="email"
                placeholder="Email"
                value={formValue.email}
                name="email"
                onChange={handleChange}
                className="border-none focus:border-none outline-none focus:text-black"
                required
              />
            </div>
            <div className="flex border-b-2 border-gray-500 py-1 items-center my-8">
              <label>
                <FaLock className="mr-2 text-lg" />
              </label>
              <input
                type="password"
                placeholder="Password"
                value={formValue.password}
                name="password"
                onChange={handleChange}
                required
                className="border-none focus:border-none outline-none focus:text-black"
              />
            </div>
            <div className="flex gap-3 my-8">
              <input type="checkbox" />
              <p className="font-noto">Remember me</p>
            </div>
            {isError && (
              <p className="font-noto mb-4 text-red-600">{isError.error}</p>
            )}
            <div className="flex">
              <button
                type="submit"
                className="rounded font-noto py-4 px-10 text-xl w-fit font-semibold uppercase bg-orange-400 text-white mx-auto"
              >
                {isLoading ? "Loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              <p
                className="block tablet:hidden text-center mt-4 text-lg underline"
                onClick={() => toggleScreen()}
              >
                Create an Account
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
