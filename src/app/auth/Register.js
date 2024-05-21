import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import usePOST from "@/hooks/usePOST";
import { FaLock } from "react-icons/fa";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import {login} from "@/lib/redux/slice/authSlice"

import LoginIMG from "/public/auth/login.jpg";

function Register({ toggleScreen }){

  const dispatch = useDispatch();
  const { isError, isLoading, data, fetchPOST } = usePOST()
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
  });
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    await fetchPOST("auth/register",formValue)
    console.log(formValue);
  };

  useEffect(() => {
    if (data) {
      dispatch(login(data.token));
    }
  }, [data]);

  return (
    <main className="bg-gray-100 py-0 tablet:py-24 w-screen overflow-hidden">
      <section className="max-w-full tablet:max-w-[900px] mx-auto  flex bg-white py-24">
        <div className="basis-2/4	ml-auto hidden tablet:block">
          <Image
            src={LoginIMG}
            width={900}
            height={900}
            priority={true}
            alt="Blog Image"
            required
            className="w-8/12 object-cover mx-auto"
          />
          <p
            className="text-center text-lg underline cursor-pointer"
            onClick={() => toggleScreen()}
          >
            I am already member
          </p>
        </div>
        <div className="basis-full mobile:basis-3/4 tablet:basis-2/4 mx-auto	px-16">
          <form onSubmit={handleSubmit}>
            <h1 className="font-EB font-bold mb-10">Sign Up</h1>
            <div className="flex border-b-2 border-gray-500 py-1 items-center my-8">
              <label>
                <MdDriveFileRenameOutline className="mr-2 text-lg" />
              </label>
              <input
                type="text"
                required
                placeholder="First Name"
                value={formValue.firstname}
                name="firstname"
                onChange={(e) => handleChange(e)}
                className="border-none focus:border-none outline-none focus:text-black"
              />
            </div>
            <div className="flex border-b-2 border-gray-500 py-1 items-center my-8">
              <label>
                <MdDriveFileRenameOutline className="mr-2 text-lg" />
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={formValue.lastname}
                name="lastname"
                onChange={(e) => handleChange(e)}
                className="border-none focus:border-none outline-none focus:text-black"
                required
              />
            </div>
            <div className="flex border-b-2 border-gray-500 py-1 items-center my-8">
              <label>
                <FaUserAlt className="mr-2 text-lg" />
              </label>
              <input
                type="email"
                placeholder="Email"
                value={formValue.email}
                name="email"
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
                required
                className="border-none focus:border-none outline-none focus:text-black"
              />
            </div>

            {isError && <p className="font-noto text-red-600">{isError.error}</p>}
            <div className="flex gap-3 my-8 ">
              <input type="checkbox" />
              <p className="font-noto">I agree with Terms of service</p>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="rounded font-noto py-4 px-10 text-xl w-fit font-semibold uppercase bg-orange-400 text-white mx-auto"
              >
               {isLoading ? "loading..." : "Sign Up"}
              </button>
            </div>
            <div>
              <p
                className="block tablet:hidden text-center mt-4 text-lg underline cursor-pointer"
                onClick={() => toggleScreen()}
              >
                I am already member
              </p>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Register;
