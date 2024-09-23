import React from "react";
import Slider from "./Slider";
import RecommendedSlider from "../../components/recommended slider/RecommendedSlider";
import MobileNav from "../../components/mobileNav/MobileNav";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <Header />
      <div className=" px-5 text-center ">
        <Slider />
        <p className=" mt-24 p-10 bg-theme-400 text-white w-[70%] block m-auto text-justify rounded-md ">
          On this website, you can easily search
          for your favorite books and authors, and explore detailed information
          about them. If a book catches your interest, you can add
          them to your favorites list. <span>click <Link to={"/explore"} className=" text-blue-400">here</Link> to search</span>
        </p>
      </div>
      <MobileNav />
      <Footer />
    </>
  );
}
