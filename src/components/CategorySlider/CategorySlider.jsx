import Slider from "react-slick";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllCategory"],
    queryFn: () =>
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`),
    staleTime: 5000 * 1000,
  });

  let settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 4000,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          autoplay: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          autoplay: true,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <div className="  flex justify-center items-center mb-32">
          <div className="loader2"></div>
        </div>
      ) : (
        <Slider {...settings}>
          {data.data.data.map((c) => (
            <div key={c._id}>
              <img src={c.image} className="w-full h-60 object-cover " alt="" />
              <span className="flex justify-center items-center   shadow-lg rounded-xl m-2">
                <h2 className=" font-bold text-sm text-slate-600 mt-3">
                  {c.name}
                </h2>
              </span>
            </div>
          ))}
        </Slider>
      )}
    </>
  );
}
