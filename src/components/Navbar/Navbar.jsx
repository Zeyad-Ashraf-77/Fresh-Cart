import { useContext, useEffect, useState, useMemo } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import img1 from "../../assets/images/freshcart-logo.svg";
import { UserContext } from "../Context/UserContext";
import { FaCartShopping } from "react-icons/fa6";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  // const [numOfCartItems, setNumOfCartItems] = useState(0);
  const { getUserCart ,numOfCartItems } = useContext(CartContext);
  const { userToken, setUserToken } = useContext(UserContext);
  const navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");
    setUserToken(null);
    navigate("/login");
  }

  const pages = useMemo(
    () => [
      { text: "Home", path: "/" },
      { text: "Cart", path: "/cart" },
      { text: "Categories", path: "/categories" },
      { text: "Brands", path: "/brands" },
      { text: "Products", path: "/products" },
      { text: "WishList", path: "/wishList" },
    ],
    []
  );

  const authpages = useMemo(
    () => [
      { text: "Login", path: "/login" },
      { text: "Register", path: "/register" },
    ],
    []
  );

  const icons = useMemo(
    () => [
      { icon: <FaFacebook />, url: "https://www.facebook.com/" },
      { icon: <FaInstagram />, url: "https://www.instagram.com/" },
      { icon: <FaYoutube />, url: "https://www.youtube.com/" },
      { icon: <FaTiktok />, url: "" },
      { icon: <FaLinkedin />, url: "https://www.linkedin.com/" },
      { icon: <FaTwitter />, url: "https://twitter.com/" },
    ],
    []
  );

  function cartShop() {
    navigate("/cart");
  }

  async function handleGetUserCart() {
    if (!userToken) return;
    try {
      const res = await getUserCart();
      if (res?.data) {
        // numOfCartItems(res.data.numOfCartItems);
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  }

  useEffect(() => {
    handleGetUserCart();
  }, [userToken]);

  return (<>
  <div className="h-20"></div>
  <nav className="bg-gray-100 navbar fixed top-0 left-0 right-0 border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center gap-4 mx-auto p-4">
        
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
          <img src={img1} alt="FreshCart Logo" />
        </span>

        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 ml-auto justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
          <span className="sr-only">Open main menu</span>
        </button>

        <div
          className="hidden gap-4 items-center w-full lg:flex grow justify-between lg:w-auto"
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 
                         rounded-lg bg-gray-100 lg:flex-row lg:space-x-8 rtl:space-x-reverse 
                         lg:mt-0 lg:border-0 lg:bg-white dark:bg-green-800 lg:dark:bg-green-900 dark:border-green-700">
            {userToken
              ? pages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-white bg-slate-700 rounded 
                                 lg:bg-transparent lg:text-slate-700 lg:p-0 
                                 dark:text-white lg:dark:text-slate-500"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))
              : authpages.map(({ text, path }) => (
                  <li key={path}>
                    <NavLink
                      to={path}
                      className="block py-2 px-3 text-white bg-slate-700 rounded 
                                 lg:bg-transparent lg:text-slate-700 lg:p-0 
                                 dark:text-white lg:dark:text-slate-500"
                    >
                      {text}
                    </NavLink>
                  </li>
                ))}
          </ul>

          <ul className="font-medium ml-auto flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 
                         rounded-lg bg-gray-100 lg:flex-row lg:space-x-4 rtl:space-x-reverse 
                         lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {icons.map((item, index) => (
              <li key={item.url || index}>
                <Link
                  to={item.url || "#"}
                  className="block py-2 px-3 text-white bg-slate-700 rounded 
                             lg:bg-transparent lg:text-slate-700 lg:p-0 
                             dark:text-white lg:dark:text-slate-500"
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>

          {userToken && (
            <div className="flex justify-center items-center relative">
              <button
                onClick={logOut}
                type="button"
                className="text-slate-800 hover:text-white transition-all duration-500 
                           hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium 
                           rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 
                           dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              >
                LogOut
              </button>
              
              <FaCartShopping

                onClick={cartShop}
                className="text-4xl cursor-pointer text-red-700"
              />
            </div>
          )}
          {
            userToken?   <span className="bg-black/80 text-white font-bold px-2 py-0.5 rounded-lg absolute right-[125px] top-[10px]">
            {numOfCartItems}
          </span>:null
          }
       
        </div>
      </div>
    </nav>
  
  </>
    
   
  );
}
