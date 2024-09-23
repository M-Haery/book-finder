import React, { useEffect, useState } from "react";
import MobileNav from "../../components/mobileNav/MobileNav";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../features/getBooksSlice";
import BigSearchItems from "../../components/search items/BigSearchItems";
import CircularProgress from "@mui/material/CircularProgress";
import Notification from "../../components/notification/Notification";
import Post from "../post/Post";
import { getBooksByAuthor } from "../../features/getByauthorNameSlice";
import BigSearchItemsAuthors from "../../components/search items/BigSearchItemsAuthor";
import AuthorPost from "../post/AuthorPost";

export default function Explore() {
  const [searchValue, setSearchValue] = useState("")

  const [hasSearched, setHasSearched] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchType, setSearchType] = useState("title");
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const dispatch = useDispatch();
  const { isLoading, data, error } = useSelector((state) => state.books);
  const { isLoadingAuthor, dataAuthor, errorAuthor } = useSelector(
    (state) => state.booksByAuthor
  );

  function submitHandler(e) {
    if (e.keyCode == 13) {
      setHasSearched(true);
      if (searchType == "title") {
        dispatch(getBooks(e.target.value));
      } else {
        dispatch(getBooksByAuthor(e.target.value));
      }
    }
  }

  function searchHandler(){
    if (searchType == "title") {
      dispatch(getBooks(searchValue));
    } else {
      dispatch(getBooksByAuthor(searchValue));
    }
  }

  function openHandler(book) {
    setSelectedBook(book);
  }

  function closePost() {
    setSelectedBook(null);
  }

  function openAuthorHandler(author) {
    setSelectedAuthor(author);
  }

  function closeAuthorPost() {
    setSelectedAuthor(null);
  }

  return (
    <div>
      <div className="flex flex-col ">
        <Header />
        {selectedBook &&
          (() => {
            const { key, ...rest } = selectedBook;
            return (
              <>
                <Post onClose={closePost} {...rest} />
                <div
                  onClick={() => setSelectedBook(null)}
                  className="main z-40 fixed w-full min-h-screen opacity-70 bg-slate-700 "
                ></div>
              </>
            );
          })()}
        {selectedAuthor &&
          (() => {
            const { key, ...rest } = selectedAuthor;
            return (
              <>
                <AuthorPost onClose={closeAuthorPost} id={key} {...rest} />
                <div
                  onClick={() => setSelectedAuthor(null)}
                  className="main z-40 fixed w-full min-h-screen opacity-70 bg-slate-700 "
                ></div>
              </>
            );
          })()}
        <div className=" flex flex-col  py-28 text-white px-2">
          <div className="flex flex-col justify-center items-center w-full">
            <h1 className=" text-center text-xl sm:text-3xl md:4xl lg:text-5xl mb-9  ">
              Search the <span className=" text-primary-200">{searchType}</span>{" "}
              Here and Press Enter
            </h1>
            <div className=" mb-10  w-[85%] sm:w-[60%]">
              <div className="flex flex-col md:flex-row gap-3 justify-center items-center w-full">
                <select
                  onChange={(e) => setSearchType(e.target.value)}
                  className=" bg-primary-200 py-4 px-10 rounded-md hover:bg-primary-300 transition-all duration-300"
                >
                  <option value="title">Title</option>
                  <option value="author">Author</option>
                </select>
                <input
                  value={searchValue}
                  onChange={(e)=>setSearchValue(e.target.value)}
                  onKeyDown={(e) => submitHandler(e)}
                  type="text"
                  className=" bg-primary-100  py-4 px-10 w-full  focus:outline-1 focus:outline-none focus:border-none rounded-tl-xl rounded-tr-xl"
                />
              </div>
              <button onClick={()=> searchHandler()} className=" w-full bg-primary-200 hover:bg-primary-300 transition-all duration-300 py-4 rounded-md mt-6">SEARCH</button>
            </div>
          </div>
          {searchType == "title" && (
            <div className="">
              {isLoading ? (
                <div className=" w-full flex justify-center items-center">
                  <CircularProgress className=" block w-ful m-auto" />
                </div>
              ) : error ? (
                <Notification color={"bg-[darkRed]"}>{error}</Notification>
              ) : data && data.docs && data.docs.length > 0 ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <Notification color={"bg-[darkRed]"}>
                    برای لود شدن تصاویر، از فیلترشکن یا دی ان اس استفاده کنید
                  </Notification>
                  <div className="grid sm:grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {data.docs.map((item) => {
                      const { key, ...rest } = item;
                      return (
                        <BigSearchItems
                          onOpen={() => openHandler(item)}
                          key={key}
                          id={key}
                          {...rest}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : hasSearched ? (
                <Notification color={"bg-[darkRed]"}>
                  نتیجه ای یافته نشد
                </Notification>
              ) : (
                <></>
              )}
            </div>
          )}
          {searchType == "author" && (
            <div className="w-full">
              {isLoadingAuthor ? (
                <div className=" w-full flex justify-center items-center">
                  <CircularProgress className=" block w-ful m-auto" />
                </div>
              ) : errorAuthor ? (
                <Notification color={"bg-[darkRed]"}>{error}</Notification>
              ) : dataAuthor &&
                dataAuthor.docs &&
                dataAuthor.docs.length > 0 ? (
                <div className="flex flex-col justify-center items-center w-full">
                  <Notification color={"bg-[darkRed]"}>
                    برای لود شدن تصاویر، از فیلترشکن یا دی ان اس استفاده کنید
                  </Notification>
                  <div className="grid sm:grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
                    {dataAuthor.docs.map((item) => {
                      const { key, ...rest } = item;
                      return (
                        <BigSearchItemsAuthors
                          onOpen={() => openAuthorHandler(item)}
                          key={key}
                          id={key}
                          {...rest}
                        />
                      );
                    })}
                  </div>
                </div>
              ) : hasSearched ? (
                <Notification color={"bg-[darkRed]"}>
                  نتیجه ای یافته نشد
                </Notification>
              ) : (
                <></>
              )}
            </div>
          )}
        </div>
      </div>
      <MobileNav />
      <Footer />
    </div>
  );
}
