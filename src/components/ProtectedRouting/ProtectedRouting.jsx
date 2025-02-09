import { useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRouting({ children }) {
  let { userToken } = useContext(UserContext);

  if (userToken) {
    return children;
  } else {
    return <Navigate to={"/login"}></Navigate>;
  }
}
