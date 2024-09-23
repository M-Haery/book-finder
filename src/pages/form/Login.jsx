import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notification from "../../components/notification/Notification";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [isUserNameWrong, setIsUserNameWrong] = useState(false);
  const [isLoginSuccessfully, setIsLoginSuccessfully] = useState(false);

  const navigate = useNavigate();

  function loginHandler() {
    fetch("https://book-server.liara.run/user")
      .then((res) => res.json())
      .then((usersData) => {
        let user = usersData.find((user) => {
          return user.userName == userName;
        });
        if (user) {
          if (user.password == password) {
            setIsLoginSuccessfully(true);
            localStorage.setItem("authToken", userName);
            setTimeout(() => {
              setIsLoginSuccessfully(false);
              navigate("/");
            }, 2000);
          } else {
            setIsPasswordWrong(true);

            setTimeout(() => {
              setIsPasswordWrong(false);
            }, 2000);
          }
        } else {
          setIsUserNameWrong(true);

          setTimeout(() => {
            setIsUserNameWrong(false);
          }, 2000);
        }
      });
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen text-white text-center ">
      {/* The notification component must take a tailwind class as a color prop */}
      {isPasswordWrong && (
        <Notification color={"bg-[darkRed]"}>password is wrong</Notification>
      )}
      {isUserNameWrong && (
        <Notification color={"bg-[darkRed]"}>user name is wrong</Notification>
      )}
      {isLoginSuccessfully && (
        <Notification color={"bg-[aqua]"}>
          you logged in Successfully
        </Notification>
      )}

      <div className="flex flex-col justify-evenly gap-3 w-64 h-80 sm:w-80 sm:h-96 bg-theme-400 px-3 rounded-xl">
        <div>
          <h1 className=" text-4xl">LOGIN</h1>
          <p>
            don't have an account?{" "}
            <Link className=" text-primary-100" to={"/registration"}>
              sign up
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
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={() => loginHandler()}
          className=" bg-primary-100 hover:bg-primary-200 transition-colors duration-300 px-4 py-1 rounded-md block mx-auto"
        >
          Login
        </button>
      </div>
    </div>
  );
}
