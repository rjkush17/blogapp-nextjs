"use client";
import Image from "next/image";
import { FaBarsStaggered } from "react-icons/fa6";
import { useState, useEffect } from "react";
import logo from "/public/header/mainlogo.png";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/lib/redux/slice/authSlice";
import { usePathname } from 'next/navigation'


function Header() {
  // navbar panel function

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dispatch = useDispatch();
  const pathname = usePathname();
 

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();
  const userAuth = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (isPanelOpen && window.innerWidth <= 900) {
      document.body.classList.add("overflow-y-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
    };
  }, [isPanelOpen]);


  const handlenav = (page) => {
    router.push(page);
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <header className=" w-screen overflow-hidden py-6 tablet:py-10 px-4 tablet:px-20 font-robo ">
      {/* navbar section */}
      <nav className="flex justify-between overflow-x-hidden">
        <div
          className="relative w-auto h-auto"
          onClick={() => router.push("/")}
        >
          <Image
            src={logo}
            alt="Website Logo"
            width={180}
            height={180}
            priority={true}
            className="w-44 h-auto"
          />
        </div>
        <div
          className=" tablet:hidden text-2xl "
          onClick={() => setIsPanelOpen(!isPanelOpen)}
        >
          <FaBarsStaggered />
        </div>

        <ul
          className={`full_ul z-[99] ${
            isPanelOpen ? " right-0 flex" : "right-[-100%] hidden"
          }`}
        >
          <li
            className="text-end text-3xl mb-6 block tablet:hidden"
            onClick={() => setIsPanelOpen(!isPanelOpen)}
          >
            x
          </li>
          <li onClick={() => handlenav("/")} className={`${pathname == "/" ? "font-bold underline" : "" } cursor-pointer`}>
            Home
          </li>
          <li onClick={() => handlenav("/blogs")} className={`${pathname == "/blogs" ? "font-bold underline" : "" } cursor-pointer`}>
            Gallery
          </li>
          <li onClick={() => handlenav("/favorite")} className={`${pathname == "/favorite" ? "font-bold underline" : "" } cursor-pointer`}>
            Favorites
          </li>
          <li onClick={() => handlenav("/profile")} className={`${pathname == "/profile" ? "font-bold underline" : "" } cursor-pointer`}>
            profile
          </li>

          {mounted ? (
            userAuth ? (
              <li className="cursor-pointer" onClick={() => dispatch(logout())}>
                Logout
              </li>
            ) : (
              <li className={`${pathname == "/auth" ? "font-bold underline" : "" } cursor-pointer`} onClick={() => handlenav("/auth")}>
                Login
              </li>
            )
          ) : (
            ""
          )}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
