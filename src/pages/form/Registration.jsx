import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../features/newUserSlice";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";

export default function Registration() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const [isUserNameTakenShow, setIsUserNameTakenShow] = useState(false);
  const [isUserNameShortShow, setIsUserNameShortShow] = useState(false);
  const [isRepeatShow, setIsRepeatShow] = useState(false);
  const [isPasswordShortShow, setIsPasswordShortShow] = useState(false);
  const [isAddedSucessfully, setiIsAddedSucessfully] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { error, data, isLoading } = useSelector((state) => state.users);

  function signUpHandler() {
    fetch("https://book-server.liara.run/user")
      .then((res) => res.json())
      .then((usersData) => {
        let isUserNameTaken = usersData.some((user) => {
          return user.userName == userName;
        });

        if (isUserNameTaken) {
          setIsUserNameTakenShow(true);
          setTimeout(() => {
            setIsUserNameTakenShow(false);
          }, 2000);
        }

        if (userName.length < 4) {
          setIsUserNameShortShow(true);
          setTimeout(() => {
            setIsUserNameShortShow(false);
          }, 2000);
        }

        if (password !== repeatPassword) {
          setIsRepeatShow(true);
          setTimeout(() => {
            setIsRepeatShow(false);
          }, 2000);
        } else if (password.length < 7) {
          setIsPasswordShortShow(true);
          setTimeout(() => {
            setIsPasswordShortShow(false);
          }, 2000);
        }

        if (
          password == repeatPassword &&
          password.length >= 7 &&
          userName.length >= 4 &&
          !isUserNameTaken
        ) {
          dispatch(createUser({ userName: userName, password: password, favorites: [] }));
          localStorage.setItem("authToken", userName);

          setiIsAddedSucessfully(true);
          setTimeout(() => {
            setUserName("");
            setPassword("");
            setRepeatPassword("");

            navigate("/");
            setiIsAddedSucessfully(false);
          }, 2000);
        }
      });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white text-center ">
      {/* The notification component must take a tailwind class as a color prop */}
      {isPasswordShortShow && (
        <Notification color={"bg-[darkRed]"}>password is short</Notification>
      )}
      {isRepeatShow && (
        <Notification color={"bg-[darkRed]"}>
          password repeat is wrong
        </Notification>
      )}
      {isUserNameShortShow && (
        <Notification color={"bg-[darkRed]"}>user name is short</Notification>
      )}
      {isUserNameTakenShow && (
        <Notification color={"bg-[darkRed]"}>
          this user name is taken
        </Notification>
      )}
      {isAddedSucessfully && (
        <Notification color={"bg-[aqua]"}>user added sucessffully</Notification>
      )}

      <div className="flex flex-col justify-evenly gap-3 w-64 sm:w-80 h-96 bg-theme-400 px-3 rounded-xl">
        <div>
          <h1 className=" text-4xl">SIGN UP</h1>
          <p>
            already have an account?{" "}
            <Link className=" text-primary-100" to={"/login"}>
              login
            </Link>
          </p>
        </div>
        <div className="flex gap-4 flex-col child:rounded-md child:py-2 child:px-3 child:bg-theme-200">
          <input
            placeholder="username"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            placeholder="repeat password"
            type="password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button
          onClick={() => signUpHandler()}
          className="bg-primary-100 hover:bg-primary-200 transition-colors duration-300 px-4 py-1 rounded-md block mx-auto"
        >
          sign up
        </button>
      </div>
    </div>
  );
}
