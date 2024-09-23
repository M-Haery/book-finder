import React from "react";
import MobileNav from "../../components/mobileNav/MobileNav";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

export default function Panel() {
  function logOutHandler(){
    localStorage.clear()
    window.location.reload()
  }
  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-evenly border border-black m-auto mt-20 sm:w-96 w-60 sm:h-[500px] h-[400px] rounded-lg shadow-2xl bg-theme-200 text-white px-3 py-5">
        <h1 className=" text-center text-3xl">{localStorage.getItem("authToken")}</h1>
        <h2>......</h2>
        <Link className=" px-8 py-3 bg-red-500 rounded-lg" onClick={()=>logOutHandler()} to={"/login"}>Log out</Link>
      </div>
      <MobileNav />
      <Footer />
    </>
  );
}
