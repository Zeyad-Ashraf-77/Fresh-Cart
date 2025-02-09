import imge1 from "../../assets/images/amazon-pay.png";
import imge2 from "../../assets/images/American-Express-Color.png";
import imge3 from "../../assets/images/mastercard.webp";
import imge4 from "../../assets/images/paypal.png";
import imge5 from "../../assets/images/get-apple-store.png";
import imge6 from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <>
      <div className="bg-gray-200 py-10 footer">
        <div className="container w-3/4 mx-auto">
          <h5 className="">Get the Fresh cart App</h5>
          <p className="my-6 text-slate-500">
            We will send you a link, open it on your phone to download the app.{" "}
          </p>
          <form className=" lg:flex sm:block sm:my-10 justify-center items-center">
            <div className="relative  z-0 w-full my-6 group">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              ></label>
              <input
                type="email"
                id="email"
                className="shadow-sm w-10/12  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500 dark:shadow-sm-light"
                placeholder="email"
                required
              />
            </div>
            <button
              type="submit"
              className="text-white bg-green-500 mb-16 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-16 py-1 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Share App
            </button>
          </form>
          <div className=" lg:flex sm:block sm:my-10 justify-between  items-center">
            <div className="lg:flex sm:block relative bottom-10 items-center sm:my-8 gap-4">
              <span>Payment partners</span>
              <img src={imge1} className="w-14   object-cover sm:my-7" alt="" />
              <img src={imge2} className="w-14  object-cover sm:my-7" alt="" />
              <img src={imge3} className="w-14  object-cover sm:my-7" alt="" />
              <img src={imge4} className="w-14  object-cover sm:my-7" alt="" />
            </div>
            <div className="lg:flex sm:block  gap-4 items-center  bottom-9 relative">
              <span>Get deliveries with FreshCart</span>
              <img src={imge5} className="w-24 object-cover sm:my-7" alt="" />
              <img src={imge6} className="w-24 object-cover sm:my-7" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
