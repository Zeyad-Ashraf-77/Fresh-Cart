import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";
import { FaSpider, FaSpinner } from "react-icons/fa";
import Loader from "../Loader/Loader";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false)
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email is invalid").required("email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][0-9]{5,10}$/,
        "password must be start charter and number"
      )
      .required("password is required"),
  });

  const navigate = useNavigate();
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const { setUserToken } = useContext(UserContext);

  const [apiError, setApiError] = useState("");
  async function handleLogin(values) {
    try {
      setIsLoading(true);
      setApiError("");
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", values);
      
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setUserToken(data.token);
        navigate("/");
      }
    } catch (error) {
      setApiError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }

function navigateToForgetPassword() {
  navigate("/forgetPassword")
  
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
        className="max-w-md my-10 mb-20 mx-auto shadow-2xl rounded-xl p-10 shadow-green-600"
      >
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {apiError}
          </div>
        ) : null}
        <h2 className="text-green-500 ">Login Now</h2>
        <div className="relative z-0 w-full my-5 mt-10 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
        <div className="relative z-0 w-full mb-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            type="password"
            name="password"
            id="password"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Password
          </label>
        </div>
        {formik.errors.password && formik.touched.password ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {formik.errors.password}
          </div>
        ) : null}
        <button
          type="submit"
          className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
        Submit
        </button>
        <a onClick={navigateToForgetPassword} className="font-semibold ml-2  cursor-pointer " > Forget Password ? </a>
      </form>
    </>
  );
}
