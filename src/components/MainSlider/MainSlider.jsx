import { useState } from "react"
import style from './MainSlider.module.css'
import Slider from "react-slick"
import image1 from '../../assets/images/slider-1.png'
import image2 from '../../assets/images/slider-2.jpeg'
import image3 from '../../assets/images/slider-fixed-2.jpeg'
import image4 from '../../assets/images/slider-fixed-3.jpeg'


export default function MainSlider() {
  var settings = {
    dots: true,
    arrows:false,
    infinite: true,
    speed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
  };
  return (
    <>
    <div className="grid grid-cols-12 p-2 mb-10">
      <div className=" col-span-12 sm:col-span-8">
      <Slider {...settings}>
        <div>
          <img src={image3} className="h-[400px] w-full object-cover" alt="" />
        </div>
        <div>
          <img src={image4} className="h-[400px] w-full object-cover" alt="" />
        </div>
      </Slider>
      </div>
      <div className=" col-span-12  sm:col-span-4 ">
         <img src={image2} className=" object-cover  h-[200px] w-full" alt="" />
         <img src={image1} className=" object-cover  h-[200px] w-full" alt="" />
      </div>

    </div>
  
    </>
  )
}
