import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoLogInOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

export default function Header() {
  const [isSearchInputShow, setIsSearchInputShow] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [userName, setUserName] = useState(localStorage.getItem("authToken"));

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogin(true);
    }
  });

  // useEffect(()=>{
  //   setUserName(localStorage.getItem("authToken"))
  // })

  return (
    <>
      <div className="  z-30 flex justify-between items-center px-5 sm:px-10 w-full h-24 bg-theme-400">
        <div className="z-30 flex items-center gap-3 md:gap-7">
          <Link to={"/"}>
            <img
              src="/images/logo.png"
              alt=""
              className=" rounded-xl w-14 h-14 sm:w-20 sm:h-20"
            />
          </Link>
          {isLogin ? (
            <Link
              to={"/panel"}
              className="text-white flex justify-center items-center gap-1 px-3 py-1 bg-primary-200 hover:bg-primary-300 transition-colors duration-100 rounded-xl"
            >
              <FaRegUser />
              {userName}
            </Link>
          ) : (
            <Link
              to={"/login"}
              className="text-white flex justify-center items-center gap-1 px-3 py-1 bg-primary-200 hover:bg-primary-300 transition-colors duration-100 rounded-xl"
            >
              <IoLogInOutline /> Login
            </Link>
          )}
        </div>
        <div className="z-30 flex gap-1 sm:gap-4">
          <Link to={"/explore"}>
            <FaSearch
              className=" text-primary-200 hover:cursor-pointer size-7 sm:size-10"
            />
          </Link>
        </div>
      </div>
      <ul className="z-30 child:z-30 hidden sm:flex justify-center items-center gap-14 py-3 text-white bg-theme-200">
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/explore"}>Explore</Link>
        </li>
        <li>
          <Link to={"/intresteds"}>Interested</Link>
        </li>
        <li>
          <Link to={"/panel"}>Panel</Link>
        </li>
      </ul>
    </>
  );
}
