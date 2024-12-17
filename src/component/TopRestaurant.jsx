import React, { useEffect, useState } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import RestaurantCard from "./RestaurantCard";

const TopRestaurant = ({ data ,title }) => {
  // console.log(data)

  const [value, setValue] = useState(0);
  // const[data,setData]=useState([]);

  // Button move yani translate ka function
  function handleNext() {
    // Prevent moving beyond the maximum value (124)
    value >= 440 ? "" : setValue((prev) => prev + 32);
  }

  function handlePrev() {
    // Prevent moving below the minimum value (0)
    value <= 0 ? "" : setValue((prev) => prev - 32);
  }

  // lifting the step up bhi use kr skte the pr chlo abhi k liye thk h
  // copy paste ha whats on mind se sb

  // async function fetchData()
  // {
  //     const data=await fetch("/api/dapi/restaurants/list/v5?lat=19.038045&lng=73.068198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
  //     const result=await data.json();
  //     // ESSE VO SB IMG KE PASS JA RHE PATH SE check kr kr ke live
  //     console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants

  //     );
  //     setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
  // }
  // // api fetching
  // useEffect(() => {
  //     fetchData()
  //  }, [])

  return (
    <div>
      <div className="flex justify-between items-center mt-12">
        <h1 className="font-bold text-2xl">
          {/* Top restaurant chains in Muzaffarpur */}
          {title}
          
        </h1>

        <div className="flex gap-3 text-2xl cursor-pointer text-gray-700 ">
          <div className="hover:text-orange-500" onClick={handlePrev}>
            <FaRegArrowAltCircleLeft />
          </div>
          <div className="hover:text-orange-500" onClick={handleNext}>
            <FaRegArrowAltCircleRight />
          </div>
        </div>
      </div>

      {/* map ka ha whi uper ka card ke liye  or -translate-x-[400px] duration-1000' move karna ha esse pe onlink lgega button pe */}

      <div
        className={`flex  duration-700 gap-5 mt-3`}
        style={{ translate: `-${value}%` }}
      >
        {/* yaha card bnao fir se naya yeh copy nhi ha whtas on mind se */}
        {data.map((restaurants) => {
          const { info } = restaurants;
          const {cta:{link}}=restaurants;

          return (
            <div key={info.id} className="hover:scale-95 duration-300">
              {/* card ko cut krdie yaha se alag component me le ja rhe */}
              <RestaurantCard {...restaurants} link={link}/>

              {/* or niche resrtuent ka name rating ye sb ke liye */}
              <div className="mt-3 cursor-pointer">
                {/* Restaurant name */}
                <h2 className="text-lg font-semibold">{info?.name}</h2>

                {/* Restaurant rating */}
                <p
                  className={`flex items-center gap-1 text-base font-semibold ${
                    info?.avgRating < 4 ? "text-yellow-500" : "text-green-600"
                  }`}
                >
                  <FaStar className="text-lg" />
                  {info?.avgRating} · <span>{info?.sla?.slaString}</span>
                </p>

                {/* Restaurant cuisines */}
                <p className="line-clamp-1 text-black/60 font-medium">
                  {info?.cuisines.join(", ")}
                </p>

                {/* Restaurant locality */}
                <p className="line-clamp-1 text-black/60 font-medium">
                  {info?.locality}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopRestaurant;
