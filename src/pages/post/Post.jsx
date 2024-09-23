import React, { useEffect, useState } from "react";
import { IoHeart } from "react-icons/io5";
import { TbXboxX } from "react-icons/tb";

export default function Post(props) {
  const [isIntrested, setIsIntrested] = useState(false);
  const [user, setUser] = useState(null);
  const [userForRemove, setUserForRemove] = useState(null);

  // handling add to favorites (handle in book page)
  function addFavoritesHandler() {
    setIsIntrested(true);

    fetch("https://book-server.liara.run/user")
      .then((res) => res.json())
      .then((usersData) => {
        const mainUser = usersData.find(
          (user) => user.userName === localStorage.getItem("authToken")
        );
        setUser(mainUser);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (user) {
      fetch(`https://book-server.liara.run/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites: [...user.favorites, props],
        }),
      }).catch((error) => console.error(error));
    }
  }, [user]);
  // ends here

  //handling remove book from favorites (handle in book page)
  function removeFavoritesHandler() {
    setIsIntrested(false);

    fetch("https://book-server.liara.run/user")
      .then((res) => res.json())
      .then((usersData) => {
        const mainUser = usersData.find(
          (user) => user.userName === localStorage.getItem("authToken")
        );
        setUserForRemove(mainUser);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (userForRemove) {
      let newFavorites = userForRemove.favorites.filter((book) => {
        return book.id !== props.id;
      });

      fetch(`https://book-server.liara.run/user/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          favorites: [...newFavorites],
        }),
      }).catch((error) => console.error(error));
    }
  }, [userForRemove]);

  //ends here

  function closeHandler() {
    props.onClose();
  }

  return (
    <>
      <div className="z-50 flex fixed top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 bg-slate-600 rounded-xl px-5 py-1 sm:py-4 lg:px-20 w-[250px] sm:w-[500px] h-[550px] md:w-[700px] lg:w-[1000px] md:items-center">
        <TbXboxX
          onClick={() => closeHandler()}
          className="fixed top-2 right-2 size-9 text-red-600 hover:text-red-700"
        />
        <>
          <div className=" flex items-center md:flex-row flex-col gap-10 w-full">
            {props.cover_i ? (
              <img
                className=" rounded-md h-[120px] w-[90px] sm:h-[152px] sm:w-[93px] md:w-[186px] md:h-[300px]"
                src={`https://covers.openlibrary.org/b/id/${props.cover_i}-L.jpg`}
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
              <h1 className=" mb-4 text-xl sm:text-2xl text-primary-100">{props.title}</h1>
              <ul className="flex flex-col gap-1 sm:gap-6 child:text-white">
                <li>
                  <span className=" text-gray-400">author:</span>{" "}
                  {props.author_name && props.author_name.length > 0 ? (
                    <span className=" text-primary-100 sm:text-xl">
                      {props.author_name[0]}
                    </span>
                  ) : (
                    <h2 className=" text-gray-400 sm:text-xl">Uncertain</h2>
                  )}
                </li>
                {props.isbn && props.isbn.length > 0 && (
                  <li className="">
                    <span className=" text-gray-400">ISBN: </span>
                    {props.isbn[0]}
                  </li>
                )}
                {props.first_publish_year && (
                  <li className="">
                    <span className=" text-gray-400">publish year: </span>
                    {props.first_publish_year}
                  </li>
                )}
                {props.publisher && props.publisher.length > 0 && (
                  <li className="">
                    <span className=" text-gray-400">publisher: </span>
                    {props.publisher[0]}
                  </li>
                )}
                {props.subject && props.subject.length > 0 && (
                  <li>
                    <span className=" text-gray-400">categorys:</span>{" "}
                    {props.subject.slice(0, 3).map((item) => (
                      <span>{item + ","}</span>
                    ))}
                  </li>
                )}
                {props.language && props.language.length > 0 && (
                  <li>
                    <span className=" text-gray-400">languages:</span>{" "}
                    {props.language.slice(0, 3).map((item) => (
                      <span>{item + " ,"}</span>
                    ))}
                  </li>
                )}
                {props.ratings_average && (
                  <li>
                    <span className=" text-gray-400">rating: </span>
                    {props.ratings_average.toFixed(2)}
                  </li>
                )}

                <li>
                  {isIntrested ? (
                    <IoHeart
                      onClick={() => removeFavoritesHandler()}
                      className=" text-red-400 hover:text-red-300 size-10"
                    />
                  ) : (
                    <IoHeart
                      onClick={() => addFavoritesHandler()}
                      className=" text-white hover:text-red-200  size-10"
                    />
                  )}
                </li>
              </ul>
            </div>
          </div>
          {/* <div className=" m-auto mt-11 bg-theme-100 p-5 rounded-lg ">
              <p>{data.volumeInfo.description}</p>
            </div> */}
        </>
      </div>
    </>
  );
}
