import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PrivateRoute({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLogin(true);
    } else {
      navigate("/login");
    }
  }, []);

  return <>{isLogin && children}</>;
}
