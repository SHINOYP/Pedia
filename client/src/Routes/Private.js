import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Redirect from "../components/redirect";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        "http://localhost:8000/api/v1/auth/user-auth"
      );
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? (
    <Outlet />
  ) : (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      {" "}
      <Redirect />
    </div>
  );
};

export default PrivateRoute;
