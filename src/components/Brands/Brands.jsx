import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [specificbrands, setSpecificBrands] = useState(null);
  const [specificBrand, setSpecificBrand] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  async function getAllBrands() {
    setIsLoading(true);
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/brands"
    );
    setIsLoading(false);

    setBrands(data.data);
    // console.log(data.data);
    
  }
  async function getSpecificBrands(bid) {
    setIsLoading(true);
    setSpecificBrand(false);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands/${bid}`
    );
    setIsLoading(false);
    setSpecificBrand(true);
    setSpecificBrands(data?.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center   h-lvh">
        <div className="loader1"></div>
      </div>
    );
  }
  return (
    <>
      {specificBrand && (
        <>
          <div className="  block  md:flex justify-between items-center gap-60 bg-gray-300 rounded-2xl p-10">
            <img
              className=" shadow-lg transition-all duration-500 rounded-lg hover:shadow-lime-600"
              src={specificbrands.image}
              alt=""
            />
            <div className="flex justify-center items-center  flex-col">
              <p className="font-semibold text-xl mt-3">
                {specificbrands.name}
              </p>
              <button
                onClick={() => setSpecificBrand(false)}
                className="px-4 py-3 bg-red-700 mt-10 text-white font-semibold rounded-lg"
              >
                {" "}
                Cancel{" "}
              </button>
            </div>
          </div>
        </>
      )}
      <div className="mt-4 text-center">
        <h1 className="text-green-600 shadow-green-500">All Brands</h1>
      </div>
      <div className="grid grid-cols-1 gap-5   md:grid-cols-2   my-10  lg:grid-cols-4 ">
        {brands.map((p) => (
          <div key={p._id} onClick={() => getSpecificBrands(p._id)}>
            <div className="flex flex-col justify-center items-center p-3 border hover:shadow-lime-500  transition-all duration-500 border-gray-200 rounded-lg shadow-md">
              <img src={p.image} alt="" />
              <p className="font-bold my-3">{p.name} </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
