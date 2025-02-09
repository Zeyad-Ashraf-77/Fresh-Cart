import { useContext, useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { IoStarSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CartContext } from "../Context/CartContext";
import { TiHeartFullOutline } from "react-icons/ti";

export default function ProductDetails() {
  const [isloading, setIsloading] = useState(false);
  const { addToCart, addToWishlist } = useContext(CartContext);
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : {};
  });
  async function handleAddToCart(id) {
    setIsloading(true);
    const res = await addToCart(id);
    setIsloading(false);
    toast.success(res.data.message,{
      style:{
        backgroundColor:'green',
        color:'white',
        fontWeight:'normal'
      }
    });
  }

  const { id, cid } = useParams();
  const { data, isError, isLoading } = useQuery({
    queryKey: ["pr", id],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`),
    staleTime: 5000 * 1000,
  });

  const [relatedProduct, setRelatedProduct] = useState([]);

  async function getProduct() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    // console.log(data);

    const products = data.data
      .filter((p) => p.category._id === cid)
      .slice(0, 5);
    setRelatedProduct(products);
    // console.log(products);
  }
  async function handleAddToWishlist(pid) {
    const res = await addToWishlist(pid);
    toast.success(res.data.message,{
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
  useEffect(() => {
    getProduct();
  }, []);

  if (isLoading) {
    return (
      <>
        <div className=" min-h-[600px]">
          <div className=" fixed inset-0 flex justify-center min-h-96 bg-white/70 items-center">
            <div className="loader1"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className=" grid grid-cols-12 mt-10 gap-4">
        <div className="  col-span-12  md:col-span-4 ">
          <img
            src={data.data.data?.imageCover}
            className="w-full max-w-60 md:max-w-full object-cover "
            alt=""
          />
        </div>
        <div className=" col-span-12  self-center  md:col-span-8 mb-5">
          <h2 className="mb-4">{data.data.data?.title}</h2>
          <p className="mb-3 text-black/60">{data.data.data?.description}</p>
          <span className="mb-5">{data.data.data?.category.name}</span>
          <div className="flex justify-between mt-3">
            <span className="font-bold">{data.data.data?.price} EGP </span>
            <span className="flex font-bold items-center gap-2">
              {data.data.data?.ratingsAverage}{" "}
              <FaStar className="text-yellow-400" />{" "}
            </span>
          </div>

          <span onClick={() => handleAddToWishlist(data.data.data.id)}>
            <TiHeartFullOutline
              className={`cursor-pointer text-5xl ml-auto transition-all ${
                wishlist[data.data.data.id] ? "text-red-700" : "text-gray-400"
              }`}
            />
          </span>
          <button
            onClick={() => handleAddToCart(data.data.data.id)}
            type="button"
            className="focus:outline-none w-full mt-7 text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isloading ? "Loading..." : " add to Cart"}
          </button>
        </div>
      </div>
      <h1 className="text-center font-extrabold">Related Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 mt-5 shadow-lg my-5 p-3 rounded-lg">
        {relatedProduct.map((product) => (
          <div key={product.id} className=" p-2  rounded-lg">
            <div className="product shadow-sm overflow-hidden my-3 rounded-xl shadow-red-500 p-3 group ">
              <Link
                to={`/productDetails/${product.id}/${product.category._id}`}
              >
                <img
                  className="w-full object-cover h-52 rounded-lg "
                  src={product.imageCover}
                  alt={product.title}
                />
                <span className=" block font-light text-green-600">
                  {product.category.name}
                </span>
                <h3 className=" text-lg font-normal text-gray-800">
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
                type=""
                className="text-white transition-all duration-700  group-hover:translate-y-0 group-hover:opacity-1 w-full my-2 translate-y-20  bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
              >
                {isloading ? "loading...." : "Add Cart"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
