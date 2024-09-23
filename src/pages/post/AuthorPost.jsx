import React, { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { TbXboxX } from "react-icons/tb";

export default function AuthorPost(props) {
  function closeHandler(){
    props.onClose()
  }
  console.log(props)

  return (
    <>
      <div className="z-50 flex fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-theme-300 rounded-xl p-5 lg:px-20 w-[250px] sm:w-[500px] h-[550px] md:w-[700px] lg:w-[1000px] md:items-center">
        <TbXboxX onClick={() => closeHandler()} className="fixed top-2 right-2 size-9 text-red-600 hover:text-red-700" />
        <>
          <div className=" flex items-center md:flex-row flex-col gap-10 w-full">
            {props.id ? (
              <img
                className=" rounded-md h-[120px] w-[90px] sm:h-[152px] sm:w-[93px] md:w-[186px] md:h-[300px]"
                src={`https://covers.openlibrary.org/a/olid/${props.id}-L.jpg`}
                alt=""
              />
            ) : (
              <img
                className=" rounded-md h-[120px] w-[90px] sm:h-[152px] sm:w-[93px] md:w-[186px] md:h-[300px]"
                src="/images/images.png"
                alt=""
              />
            )}
            <div className="">
              <h1 className=" mb-4 text-2xl text-primary-100">{props.name}</h1>
              <ul className="flex flex-col gap-1 sm:gap-6 child:text-white">
                {props.type &&
                    <li>
                       <span className=" text-gray-400">type:</span> {props.type}
                    </li>
                }
                {props.birth_date &&
                    <li>
                       <span className=" text-gray-400">birth date:</span> {props.birth_date}
                    </li>
                }
                {props.ratings_average &&
                    <li>
                       <span className=" text-gray-400">rating:</span> {props.ratings_average.toFixed(2)}
                    </li>
                }
                {props.work_count &&
                    <li>
                       <span className=" text-gray-400">work count:</span> {props.work_count}
                    </li>
                }
                {props.top_work &&
                    <li>
                       <span className=" text-gray-400">top work:</span> {props.top_work}
                    </li>
                }
                {props.top_subjects && props.top_subjects.length > 0 &&
                    <li>
                       <span className=" text-gray-400">top subjects:</span> {props.top_subjects.slice(0, 3).map((item) => (
                      <span>{item + " ,"}</span>
                    ))}
                    </li>
                }
              </ul>
            </div>
          </div>
        </>
      </div>
    </>
  );
}
