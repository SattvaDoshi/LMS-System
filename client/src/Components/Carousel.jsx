import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-3xl h-[30vh] mx-auto my-12">
      <Slider {...settings}>
        <div className="px-4">
          <div className=" bg-gray-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              src="https://cdn1.vectorstock.com/i/1000x1000/42/35/student-icon-cartoon-style-vector-35354235.jpg"
              alt="Student 1"
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-bold text-gray-200">John Doe</p>
            <p className="">Amazing course! I learned a lot.</p>
          </div>
        </div>
        <div className="px-4">
          <div className="bg-gray-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              src="https://png.pngtree.com/png-clipart/20230915/original/pngtree-headshot-of-a-business-professional-wearing-a-necktie-vector-png-image_12217006.png"
              alt="Student 2"
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-bold text-gray-200">Jane Smith</p>
            <p className="">
              Highly recommend this course to everyone.
            </p>
          </div>
        </div>
        <div className="px-4">
          <div className="bg-gray-500 rounded-lg shadow-md p-6 flex flex-col items-center text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2995/2995462.png"
              alt="Student 3"
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="text-lg font-bold text-gray-200">Mike Johnson</p>
            <p className="">Best learning experience ever!</p>
          </div>
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;