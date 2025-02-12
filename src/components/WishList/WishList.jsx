import { useContext, useEffect, useState, useCallback } from "react";
import { CartContext } from "../Context/CartContext";
import { FaTrash } from "react-icons/fa";
import { TiHeartFullOutline } from "react-icons/ti";
import toast from "react-hot-toast";

export default function WishList() {
  const { getProductInWishlist, removeProductInWishlist, addToCart } =
    useContext(CartContext);
  const [productWishList, setProductWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBtn, setIsLoadingBtn] = useState(false);

  const handleGetProductInWishlist = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await getProductInWishlist();
      setProductWishList(res?.data?.data || []);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist.");
    }
    setIsLoading(false);
  }, [getProductInWishlist]);

  async function handleRemoveProductInWishlist(pid) {
    try {
    setIsLoading(true);

      await removeProductInWishlist(pid);
      setProductWishList((prevList) => prevList.filter((p) => p.id !== pid));
       toast.error('Remove from Wish List',{
        position:'top-right',
        duration:5000,
        style:{
          backgroundColor:'black',
          color:'white',
          fontWeight:'bold'
        }
       })
    } catch (error) {

      console.error("Error removing product:", error);
      toast.error("Failed to remove product.");
    }
    setIsLoading(false);

  }

  async function handleAddToCart(id) {
    setIsLoadingBtn(true);
    try {
      const res = await addToCart(id);
      toast.success(res.data.message,{
        style:{
          backgroundColor:'green',
          color:'white',
          fontWeight:'normal'
        }
      });
      handleRemoveProductInWishlist(id);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add product to cart.");
    }
    setIsLoadingBtn(false);
  }

  useEffect(() => {
    handleGetProductInWishlist();
  }, [handleGetProductInWishlist]);

  if (isLoading) {
    return (
      <div className="h-lvh flex justify-center items-center">
        <div className="loader1"></div>
      </div>
    );
  }

  return (
    <div className="my-20 bg-gray-100 rounded-xl shadow-lg shadow-green-800 p-4">
      <h1 className="flex items-center justify-center gap-1  font-bold">
        My Wish List <TiHeartFullOutline className="text-5xl text-red-700" />
      </h1>

      {productWishList.length === 0 ? (
        <p className="text-center font-bold text-gray-600 my-4">Your wishlist is empty.</p>
      ) : (
        productWishList.map((p) => (
          <div key={p._id} className="grid grid-cols-12 gap-4 p-4 border-b">
            <div className="col-span-12 md:col-span-3">
              <img src={p?.imageCover} className="w-full max-h-60 object-contain" alt={p.title} />
            </div>
            <div className="col-span-12 md:col-span-9 flex text-s flex-col md:flex-row justify-between gap-5 items-center">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">{p.title}</span>
                <span className="text-yellow-400 font-bold ">{p.price} EGP</span>
                <button
                  onClick={() => handleRemoveProductInWishlist(p.id)}
                  className="text-white rounded-lg px-2 hover:bg-red-900 transition-all duration-300 font-medium py-2 max-w-32  flex gap-1 bg-red-700 items-center"
                >
                  <FaTrash className="text-white" /> Remove
                </button>
              </div>
              <button
                onClick={() => handleAddToCart(p.id)}
                className="px-4 py-3 bg-green-400 min-w-72 hover:bg-transparent hover:text-black transition-all duration-300 hover:ring-1 ring-black font-bold rounded-lg text-white"
              >
                {isLoadingBtn ? "Loading..." : "Add to Cart"}
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
