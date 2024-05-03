import React, { useState } from "react";
import BlogCard from "../_components/BlogCard";
import { IoMdArrowBack } from "react-icons/io";
import { IoMdArrowForward } from "react-icons/io";


function Pagination({ data, items }) {
  //number of items in one page
  const itemsPerPage = items;
  //current pages
  const [currentPage, setCurrentPage] = useState(1);
  //how many pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const lastItem = currentPage * itemsPerPage;
  const firstItem = lastItem - itemsPerPage;
  const currentItems = data.slice(firstItem, lastItem);

  //function for chnage the page
  const handlePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <div className="w-11/12 mx-auto mt-12 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-8 h-full">
        {currentItems.map((val, ind) => (
          <BlogCard data={val} key={ind} />
        ))}
      </div>
      <section className="flex w-fit mx-auto text-3xl gap-10 my-16">
        <button
          onClick={() => handlePage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${currentPage === 1 ? "text-gray-400" : ""}`}
        >
         <IoMdArrowBack />

        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePage(index + 1)}
            className={`${currentPage === index + 1 ? "" : "text-gray-400"}`}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${currentPage === 3 ? "text-gray-400" : ""}`}
        >
          <IoMdArrowForward />
        </button>
      </section>
    </>
  );
}

export default Pagination;
