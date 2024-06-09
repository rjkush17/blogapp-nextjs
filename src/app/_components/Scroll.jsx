"use client"
import { useState, useEffect } from 'react';
import { BiSolidToTop } from "react-icons/bi";



const Scroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled up to a certain distance
  const toggleVisibility = () => {
    if (window.pageYOffset > 1000) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
   <>
    {isVisible && (
    <div className="bg-white p-2 fixed top-[91vh] mobile:top-[89vh] rounded-full overflow-hidden aspect-square mobile:right-12 right-4 z-[99] drop-shadow-2xl">
 
        <button onClick={scrollToTop} className="scroll-to-top-button">
        <BiSolidToTop className=' rounded-full text-3xl' />
        </button>

    </div>
    )}
   </>
  );
};

export default Scroll;
