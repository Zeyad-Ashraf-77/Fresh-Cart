import { useState } from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import Brands from "./components/Brands/Brands";
import ProtectedRouting from "./components/ProtectedRouting/ProtectedRouting";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { Toaster } from "react-hot-toast";
import Allorders from "./components/Allorders/Allorders";
import WishList from "./components/WishList/WishList";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetCode from "./components/ResetCode/ResetCode";
import NewPassword from "./components/NewPassword/NewPassword";

function App() {
  const [count, setCount] = useState(0);

  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRouting>
              <Home />
            </ProtectedRouting>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRouting>
              <Cart />
            </ProtectedRouting>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRouting>
              <Products />
            </ProtectedRouting>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRouting>
              <Categories />
            </ProtectedRouting>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRouting>
              <Brands />
            </ProtectedRouting>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRouting>
              <Allorders />
            </ProtectedRouting>
          ),
        },
        {
          path: "forgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "resetCode",
          element: <ResetCode />,
        },
        {
          path: "newPassword",
          element: <NewPassword />,
        },
        {
          path: "wishList",
          element: (
            <ProtectedRouting>
              <WishList />
            </ProtectedRouting>
          ),
        },

        {
          path: "productDetails/:id/:cid",
          element: (
            <ProtectedRouting>
              <ProductDetails />
            </ProtectedRouting>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
