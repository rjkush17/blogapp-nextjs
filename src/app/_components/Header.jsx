"use client";
import Image from "next/image";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";

function Header() {
  // navbar panel function
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return (
    <header className=" w-screen overflow-hidden py-6 tablet:py-10 px-4 tablet:px-20 font-robo">
      {/* navbar section */}
      <nav className="flex justify-between overflow-x-hidden">
        <div className="relative w-auto">
          <Image
            src="/header/mainlogo.png"
            alt="Website Logo"
            width={180}
            height={50}
            objectFit="cover"
            priority
          />
        </div>
        <div
          className=" tablet:hidden text-2xl "
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <FaBarsStaggered />
        </div>

        <ul
          className={`full_ul ${ 
            isPanelOpen
              ? " right-0 flex"
              : "right-[-100%]  hidden"
          }`}
        >
          <li
            className="text-end text-3xl mb-6 block tablet:hidden"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            x
          </li>
          <li>Home</li>
          <li>Gallery</li>
          <li>Bookmarks</li>
          <li>profile</li>
          <li>Login/singup</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
