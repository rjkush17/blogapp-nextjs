import React from "react";
import Loader from "@/app/_components/Loader";

function loading() {
  return (
    <section className="flex flex-col justify-center items-center w-screen h-[80vh] mobile:max-h-96 bg-white cursor-wait">
      <Loader/>
    </section>
  );
}

export default loading;
