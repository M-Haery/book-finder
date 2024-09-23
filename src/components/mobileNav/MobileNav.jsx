import React from 'react'
import { Link } from 'react-router-dom';

import { GrHomeRounded } from "react-icons/gr";
import { GrCompass } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import { FaRegUser } from "react-icons/fa6";

export default function MobileNav() {
  return (
    <div className=' z-50 flex items-center justify-evenly sm:hidden w-[95%] right-0 left-0 m-auto h-16 bg-theme-100 bg-opacity-50 fixed bottom-1 rounded-lg child:rounded-md child:w-12 child:h-12 child:bg-blue-950 child:text-white child:flex child:justify-center child:items-center'>
      <Link to={"/"}><GrHomeRounded size={"25px"}/></Link>
      <Link to={"/explore"}><GrCompass size={"25px"}/></Link>
      <Link to={"/intresteds"}><AiOutlineHeart size={"25px"}/></Link>
      <Link to={"/panel"}><FaRegUser size={"25px"}/></Link>
    </div>
  )
}
