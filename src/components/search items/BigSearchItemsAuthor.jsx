import React, { useState, useEffect } from "react";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function BigSearchItemsAuthors(props) {
  function clickHandler(){
    props.onOpen()
  }

  return (
    <>
    
      <div className="relative w-60 sm:w-80 text-white text-left bg-theme-400 py-10 px-5 rounded-xl">
        <div className=" rounded-xl  m-auto">
          {props.id ? (
            <img
              className=" w-40 h-60 block m-auto"
              src={`https://covers.openlibrary.org/a/olid/${props.id}-L.jpg`}
              alt=""
            />
          ) : (
            <img
              className=" h-60 w-40 block m-auto"
              src="./images/images.png"
              alt=""
            />
          )}
        </div>
          <button onClick={() => clickHandler()} className=" text-left my-3 sm:text-2xl hover:text-gray-200">
            {props.name}
          </button>

      </div>
    </>
  );
}
