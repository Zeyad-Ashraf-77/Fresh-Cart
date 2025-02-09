import { useContext, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from "../Context/UserContext";
import { FaSpider, FaSpinner } from "react-icons/fa";
import Loader from "../Loader/Loader";

export default function ResetCode() {
  const [isLoading, setIsLoading] = useState(false)
   const navigate=useNavigate()

  const formik = useFormik({
    initialValues:{
      resetCode:'',
    },
    onSubmit:handleVerifyResetCode
   })
 async function handleVerifyResetCode(values){
  setIsLoading(true)
    const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',values)
    console.log(data);
    setIsLoading(false)
    if (data.status==="Success") {
      navigate('/newPassword')
    }

    
  }
  if (isLoading) {
    return<>
    <div className=" min-h-[500px]">
    <div className=" fixed inset-0 flex justify-center min-h-96 bg-white/70 items-center">
    <div className="loader1"></div>
    </div>
  </div>
    
    </>
    
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit}
      className="max-w-md my-10 mb-20 mx-auto shadow-2xl rounded-xl p-10 shadow-red-600"
      >
        <h1>Verify Code</h1>
        <div className="relative z-0 w-full my-5 mt-10 group">
          <input
            {...formik.getFieldProps("resetCode")}
            type="tel"
            name="resetCode"
            id="resetCode"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-red-500 focus:outline-none focus:ring-0 focus:border-red-600 peer"
            placeholder=""
          />
          <label
            htmlFor="resetCode"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-red-600 peer-focus:dark:text-red-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Please enter Code :
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          Submit
          {/* {isLoading ? <FaSpinner /> : "Submit"} */}
        </button>
      </form>
    </>
  );
}
