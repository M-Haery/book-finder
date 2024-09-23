import React, { useState, useEffect } from "react";
import { IoHeart } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";

export default function BigIntrestedsItems(props) {
  const [user, setUser] = useState(null);
  const [userForRemove, setUserForRemove] = useState(null);

  function clickHandler(){
    props.onOpen()
  }

  //handling remove book from favorites (handle in intresteds page)
  function removeFavoritesHandler() {

    fetch("https://book-server.liara.run/user")
    .then((res) => res.json())
    .then((usersData) => {
      const mainUser = usersData.find(
        (user) => user.userName === localStorage.getItem("authToken")
      );
      setUser(mainUser);
    })
    .catch((error) => console.error(error));

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
      })
      .then(()=>window.location.reload())
      .catch((error) => console.error(error));
    }
  }, [userForRemove]);

  //ends here

  return (
    <>
    
      <div className="relative w-60 sm:w-80 text-white text-left bg-theme-400 py-10 px-5 rounded-xl">
        <div className=" rounded-xl  m-auto">
          {props.cover_i ? (
            <img
              className=" w-40 h-60 block m-auto"
              src={`https://covers.openlibrary.org/b/id/${props.cover_i}-L.jpg`}
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
            {props.title}
          </button>
        <div className="flex justify-between">
          {props.author_name && props.author_name.length > 0 ? (
            <h2 className=" text-gray-400 sm:text-xl">
              {props.author_name[0]}
            </h2>
          ) : (
            <h2 className=" text-gray-400 sm:text-xl">Uncertain</h2>
          )}
        </div>
  
          <CiCircleRemove
            onClick={() => removeFavoritesHandler()}
            className=" absolute right-2 bottom-2 text-red-400 hover:text-red-300 hover:cursor-pointer size-10"
          />
      </div>
    </>
  );
}
