import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export default function Categories() {
  const [category, setCategory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [specificCategory, setSpecificCategory] = useState(false);
  const [specificCategoryData, setSpecificCategoryData] = useState(null);

  async function getAllCategory() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setIsLoading(false);
    // console.log(data.data);
    setCategory(data.data);
  }

  async function getSpasficCategory(cid) {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${cid}`
    );
    setSpecificCategoryData(data.data);
    setIsLoading(false);
    setSpecificCategory(true);
    console.log(data.data);
  }
  useEffect(() => {
    getAllCategory();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-lvh">
        <div className="loader1"></div>
      </div>
    );
  }
  return (
    <>
      {specificCategory && (
        <>
          <div className="  block  md:flex justify-between items-center gap-60 bg-gray-300 rounded-2xl p-10">
            <img
              className=" shadow-lg transition-all w-full max-h-60 object-contain duration-500 rounded-lg hover:shadow-green-600"
              src={specificCategoryData.image}
              alt=""
            />
            <div className="flex justify-center items-center  flex-col">
              <p className="font-semibold text-xl mt-3">
                {specificCategoryData.name}
              </p>
              <button
                onClick={() => setSpecificCategory(false)}
                className="px-4 py-3 bg-red-700 mt-10 text-white font-semibold rounded-lg"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
        </>
      )}

      <div className="grid grid-cols-1   md:grid-cols-2   lg:grid-cols-3 gap-10 my-10">
        {category.map((p) => (
          <div onClick={() => getSpasficCategory(p._id)} key={p._id}>
            <div className="max-w-sm bg-white border hover:border-green-400 hover:shadow-lime-700 transition-all duration-500  border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
              <img
                className="rounded-t-lg w-full object-contain max-h-60"
                src={p.image}
                alt=""
              />
              <div className="p-5 text-center">
                <p className="font-bold">{p.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
