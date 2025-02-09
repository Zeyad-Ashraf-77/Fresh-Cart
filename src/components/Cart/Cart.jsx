import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { FaTrash } from "react-icons/fa6";
import Loader from "../Loader/Loader";
import { useFormik } from "formik";
import * as Yup from "yup"

export default function Cart() {
  const {
    getUserCart,
    removeItemCart,
    updateProductQu,
    clearCart,
    checkOutSession,
  } = useContext(CartContext);
  const [cartId, setCartId] = useState(null);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [cartDetails, setCartDetails] = useState(null);
  const [openForm, setOpenForm] = useState(false)

  async function handleGetUserCart() {
    setIsLoading(true);
    const res = await getUserCart();
    setIsLoading(false);
    // console.log(res);
    setCartId(res.data.cartId);
    setNumOfCartItems(res.data.numOfCartItems);
    setProducts(res.data.data.products);
    setTotalCartPrice(res.data.totalCartPrice);
    setCartDetails(res.data.data);
    // console.log(res.data.data.products);
  }
  async function handleRemoveItemCart(pid) {
    const res = await removeItemCart(pid);
    console.log(res);
    setCartId(res.data.cartId);
    setNumOfCartItems(res.data.numOfCartItems);
    setProducts(res.data.data.products);
    setTotalCartPrice(res.data.totalCartPrice);
    setCartDetails(res.data.data);
  }
  async function handleUpdateProductQu(pid, count) {
    const res = await updateProductQu(pid, count);
    console.log(res);
    setCartId(res.data.cartId);
    setNumOfCartItems(res.data.numOfCartItems);
    setProducts(res.data.data.products);
    setTotalCartPrice(res.data.totalCartPrice);
    setCartDetails(res.data.data);
  }
  async function handleClearCart() {
    const res = await clearCart();
    // console.log(res);
    setCartId(null);
    setNumOfCartItems(0);
    setProducts(null);
    setTotalCartPrice(null);
    setCartDetails(null);
  }

  async function handleCheckOutSession(value) {
    const res = await checkOutSession(cartId , value);
    location.href = res.data.session.url;
  }
let  validationSchema = Yup.object().shape({
      
    details:Yup.string().min(3 , 'name min length 3').max(50 , 'max length 50').required('Details is required'),
    city:Yup.string().matches(/^[A-Za-z\u0600-\u06FF\s-]{3,50}$/,'Must start A-Z').required('city is required'),
    phone:Yup.string().matches(/^01[0125][0-9]{8}$/ , "phone must be egyptian number").required(),

  })
   const formik =useFormik({
    initialValues:{
        details: "",
        phone: "",
        city: "",
    },
    validationSchema,
    onSubmit:handleCheckOutSession
   })
  useEffect(() => {
    handleGetUserCart();
  }, []);

  if (isLoading) {

    return <div className="h-lvh">
            <div className="flex justify-center items-center  my-32 bg-slate-900 rounded-full py-16">
            <Loader/>
            </div>
    </div>
    
  }

  return (
    <>
      {numOfCartItems == 0 && <div className="flex justify-center items-center flex-col  my-10 bg-slate-900 rounded-full py-16">
      <Loader/>
      <h1 className="text-white">-------- Empty Cart ---------</h1>
    </div>}

      {numOfCartItems != 0 && (
        <>
          <div className=" block gap-3  md:flex md:justify-between  items-center bg-gray-300 rounded-xl my-4  shadow-lg border-black p-3">
            <div className="flex flex-col justify-center items-center ">
              <span className=" font-bold text-black/80 p-1 rounded-lg  m-1">
              TotalCartPrice: <span className="text-red-600 text-lg">{cartDetails?.totalCartPrice}</span> 
              </span>
              <span className=" font-bold text-black/80 p-1 rounded-lg  ">
              NumOfCartItems: <span className="text-red-600 text-lg" >{numOfCartItems}</span> 
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearCart}
              className=" bg-black transition-all duration-500 text-white hover:bg-red-700 hover:text-white  hover:ring-1 ring-red-400 font-bold rounded-xl mt-4 text-md px-10 h-12 flex justify-center items-center gap-2"
            >
              Clear <FaTrash />
            </button>
          </div>

          <div className="relative overflow-x-auto  rounded-lg shadow-2xl sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr
                    key={p._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img
                        src={p.product.imageCover}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {p.product.title}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() =>
                            handleUpdateProductQu(p.product.id, p.count - 1)
                          }
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </button>
                        <div>{p.count}</div>
                        <button
                          onClick={() =>
                            handleUpdateProductQu(p.product.id, p.count + 1)
                          }
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {p.price * p.count}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleRemoveItemCart(p.product.id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="my-5">
            <button
              onClick={()=>setOpenForm(true)}
              className="px-5 py-3 bg-green-400  rounded-lg text-white font-semibold"
            >
              continuo
            </button>
          </div>
        </>
      )}

      {
        openForm && <>
      <div className="flex fixed inset-0 p-5 check bg-white/80 justify-center items-center"> 
        <form onSubmit={formik.handleSubmit}  className="" >
          <div className="flex justify-center flex-col items-center min-w-96 min-h-96 bg-gray-300 gap-4 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg p-5">
          <h2 className="mb-3 text-black">Shaping Form</h2>
          <input {...formik.getFieldProps('details')} type="text" className=" rounded-lg outline-none border-green-500 w-full"  placeholder="Details" />
          {formik.errors.details && formik.touched.details ?<div className="p-4  w-full  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.details}
          </div>:null}
          <input {...formik.getFieldProps('city')} type="text" className=" rounded-lg outline-none border-green-500 w-full"  placeholder="City" />
          {formik.errors.city && formik.touched.city ?<div className="p-4  w-full  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.city}
          </div>:null}
          <input {...formik.getFieldProps('phone')} type="tel" className=" rounded-lg outline-none border-green-500 w-full"  placeholder="phone" />
          {formik.errors.phone && formik.touched.phone ?<div className="p-4  w-full  mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
          </div>:null}
          <button type="submit" className="px-3 py-3 w-full bg-green-600 font-bold text-white rounded-lg" >CheckOut session</button>
          <button type="button" onClick={()=>setOpenForm(false)} className="px-3 py-3 w-full bg-red-600 font-bold text-white rounded-lg" >Cancel</button>
          </div>
        
        </form>   
        </div>
      
        </>
      }
    </>
  );
}
