import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";
import { FaSpider, FaSpinner } from "react-icons/fa";
import Loader from "../Loader/Loader";

export default function Login() {
  const { setUserToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false)
  const [apiError, setApiError] = useState("");
  const [virifyCod, setVirifyCod] = useState(false)
  const navigate = useNavigate();


  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleForgetPassword,
  });
  async function handleForgetPassword(values) {
    console.log(values);
    try {
      setIsLoading(true)
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        values
      );
      console.log(data);
      setIsLoading(false)
      // localStorage.setItem("userToken", data.token);
      // setUserToken(data.token);
      if (data.statusMsg === "success") {
        navigate("/resetCode");
      }
    } catch (error) {
      console.log(error);
      setApiError(error.response.data.message);
    }finally{
      setVirifyCod(true)
    }
  }
  if (isLoading) {
    return<>
    <div className=" min-h-[500px]">
    <div className=" fixed inset-0 flex justify-center min-h-96 bg-white/80 items-center">
    <div className="loader1"></div>
    </div>
  </div>
    
    </>
    
  }
 

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-md my-10 mb-20 mx-auto shadow-xl rounded-xl shadow-red-700 p-10"
      >
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <h2 className="text-red-700 ">Forget Password</h2>

      
        
        <div className="relative z-0 w-full my-5 mt-10 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Email address
          </label>
        </div>

        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.email}
          </div>
        ) : null}
       
        <button
          type="submit"
          className="text-white bg-red-800 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-green-800"
        >
          {
            isLoading?<FaSpinner/>:"Continua"
          }
        </button>
        
      
     
      </form>
    </>
  );
}
