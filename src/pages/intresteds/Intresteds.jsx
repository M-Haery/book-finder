import React, { useEffect, useState } from "react";
import MobileNav from "../../components/mobileNav/MobileNav";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useSelector, useDispatch } from "react-redux";
import { getFavorites } from "../../features/getFavoritesSlice";
import CircularProgress from "@mui/material/CircularProgress";
import BigIntrestedsItems from "../../components/search items/BigIntrestedItems";
import Post from "../post/Post";

export default function Intresteds() {
  const dispatch = useDispatch();
  const { favData, isLoading, error } = useSelector((state) => state.favorites);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    fetch("https://book-server.liara.run/user")
      .then((res) => res.json())
      .then((users) => {
        const mainUser = users.find((user) => {
          return user.userName == localStorage.getItem("authToken");
        });
        return mainUser;
      })
      .then((mainUser) => mainUser.id)
      .then((userId) => dispatch(getFavorites(userId)));
  }, []);

  function openHandler(book) {
    setSelectedBook(book);
  }

  function closePost(){
    setSelectedBook(null)
  }

  return (
    <>
      <div className="flex flex-col ">
      <Header />
      <div className="flex flex-col w-full min-h-[500px]">
      {selectedBook &&
          (
            () => {
            const {key, ...rest} = selectedBook;
            return (
            <>
              <Post onClose={closePost} {...rest} />
              <div onClick={()=> setSelectedBook(null)} className="main z-40 fixed w-full min-h-screen opacity-70 bg-slate-700 "></div>
            </>
            )
          }
          )()}
        {isLoading && <CircularProgress className=" m-auto mt-10"/>}
        {favData.length > 0 && (
          <div className="grid sm:grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center mt-20 px-2 sm:px-10">
            {favData.map((item) => (
              <BigIntrestedsItems key={item.id} {...item} onOpen={() => openHandler(item)}/>
            ))}
          </div>
        )}
      </div>
      </div>
      <MobileNav />
      <Footer />
    </>
  );
}
