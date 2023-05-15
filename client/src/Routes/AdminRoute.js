import { useState, useEffect } from "react";
import { useAuth } from "../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Redirect from "../components/redirect";

const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios
        .get("http://localhost:8000/api/v1/auth/admin-auth")
        .then((res) => {
          if (res.data.ok) {
            setOk(true);
          } else {
            setOk(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
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
      <Redirect path="" />
    </div>
  );
};

export default AdminRoute;
