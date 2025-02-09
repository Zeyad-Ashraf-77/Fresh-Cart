import { IoStarSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useGetProduct } from "../../Hooks/useGetProduct";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import toast from "react-hot-toast";
import { TiHeartFullOutline } from "react-icons/ti";
import Loader from "../Loader/Loader";

export default function RecentProducts() {
  const { isError, isLoading, data } = useGetProduct();
  const [isloading, setIsloading] = useState(false);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : {};
  });

  async function handleAddToCart(id) {
    setIsloading(true);
    const res = await addToCart(id);
    toast.success(res.data.message,{
      style:{
        backgroundColor:'green',
        color:'white',
        fontWeight:'normal'
      }
    });
    setIsloading(false);
  }

  async function handleAddToWishlist(pid) {
    const res = await addToWishlist(pid);
    toast.success(res.data.message , {
      position:'top-right',
      duration:5000,
      style:{
        backgroundColor:'red',
        color:'white',
        fontWeight:'bold'
      }
    });

    setWishlist((prevWishlist) => {
      const updatedWishlist = {
        ...prevWishlist,
        [pid]: !prevWishlist[pid], 
      };
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  }

  return (
    <>
      {isError && <span className="loader"></span>}
      {isLoading ? (
        <div className="fixed inset-0 flex justify-center bg-white/90 items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 shadow-lg my-5 shadow-gray-300 rounded-lg md:grid-cols-3 lg:grid-cols-5">
          {data.data.data.map((product) => (
            <div key={product.id} className="p-2">
              <div className="product shadow-sm overflow-hidden my-3 rounded-xl shadow-red-500 p-3 group">
                <Link
                  to={`/productDetails/${product.id}/${product.category._id}`}
                >
                  <img
                    className="w-full object-cover h-52 rounded-lg"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="block font-light text-green-600">
                    {product.category.name}
                  </span>
                  <h3 className="text-lg font-normal text-gray-800">
                    {product.title.split(" ", 2).join(" ")}
                  </h3>
                  <div className="flex justify-between items-center">
                    <span>{product.price} EGP</span>
                    <span className="flex items-center justify-center">
                      {product.ratingsAverage}
                      <IoStarSharp className="text-yellow-300" />
                    </span>
                  </div>
                </Link>

                <span onClick={() => handleAddToWishlist(product.id)}>
                  <TiHeartFullOutline
                    className={`cursor-pointer text-3xl ml-auto transition-all ${
                      wishlist[product.id] ? "text-red-700" : "text-gray-400"
                    }`}
                  />
                </span>

                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="text-white transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-1 w-full my-1 translate-y-20 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
                >
                  {isloading ? "loading..." : "Add Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
