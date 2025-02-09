import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = { token: localStorage.getItem("userToken") };
  const [numOfCartItems, setNumOfCartItems] = useState(0);


  async function getUserCart() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      setNumOfCartItems(res.data.numOfCartItems || 0);
      return res;
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  }

  async function addToCart(id) {
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId: id }, { headers });
      setNumOfCartItems((prev) => prev + 1);
      return res;
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  }

  async function removeItemCart(pid) {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${pid}`, { headers });
      setNumOfCartItems((prev) => Math.max(prev - 1, 0));
      return res;
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  }

  async function updateProductQu(pid, count) {
    try {
      const res = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${pid}`, { count }, { headers });
      return res;
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
  async function clearCart() {
    try {
      const res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      setNumOfCartItems(0); // تصفير العدد
      return res;
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  }

  async function checkOutSession(cid, shippingAddress) {
    try {
      const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cid}?url=http://localhost:5173`, 
        { shippingAddress }, 
        { headers }
      );
      return res;
    } catch (error) {
      console.error("Error in checkout:", error);
    }
  }

  async function addToWishlist(pid) {
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist", { productId: pid }, { headers });
      return res;
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  }

  async function getProductInWishlist() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers });
      return res;
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function removeProductInWishlist(pid) {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${pid}`, { headers });
      return res;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  }

  useEffect(() => {
    // getUserCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        checkOutSession,
        addToCart,
        getUserCart,
        removeItemCart,
        updateProductQu,
        clearCart,
        addToWishlist,
        getProductInWishlist,
        removeProductInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
