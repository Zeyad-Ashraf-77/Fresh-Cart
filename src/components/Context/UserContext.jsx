
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userToken, setUserToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (!userToken) {
      localStorage.removeItem("token");
    } else {
      localStorage.setItem("token", userToken);
    }
  }, [userToken]);

  return (
    <UserContext.Provider value={{ userToken, setUserToken, isLogin: Boolean(userToken) }}>
      {children}
    </UserContext.Provider>
  );
}
