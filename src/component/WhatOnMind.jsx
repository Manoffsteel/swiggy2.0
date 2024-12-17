// import React from 'react'
import React, { useEffect, useState } from 'react'
import { FaRegArrowAltCircleLeft,FaRegArrowAltCircleRight } from "react-icons/fa";

const WhatOnMind = ({data}) => {
    // const[data,setData]=useState([]);
    const [value,setValue]=useState(0);
    // async function fetchData() 
    // {
    //     const data=await fetch("/api/dapi/restaurants/list/v5?lat=19.038045&lng=73.068198&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     const result=await data.json();
    //     // ESSE VO SB IMG KE PASS JA RHE PATH SE check kr kr ke live 
    //     console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //     setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    // }
    // // api fetching
    // useEffect(() => {
    //     fetchData()
    //  }, [])

   // Button move yani translate ka function
    function handleNext() {
    // Prevent moving beyond the maximum value (124)
    value >= 124 ? "" : setValue((prev) => prev + 31);
    }

   function handlePrev() {
    // Prevent moving below the minimum value (0)
    value <= 0 ? "" : setValue((prev) => prev - 31);
    } 
  return (
    <div>
         <div className='flex justify-between items-center'>
            <h1 className="font-bold text-2xl">What's on your mind?</h1>

            <div className='flex gap-3 text-2xl cursor-pointer text-gray-700 '>
                <div className='hover:text-orange-500' onClick={handlePrev}>
                <FaRegArrowAltCircleLeft />
                </div>
                <div className='hover:text-orange-500' onClick={handleNext}>
                <FaRegArrowAltCircleRight /> 
                </div>
            </div>
            </div>


           {/* map ka ha whi uper ka card ke liye  or -translate-x-[400px] duration-1000' move karna ha esse pe onlink lgega button pe */}
           
            <div className={`flex  duration-500 cursor-pointer`}
            style={{ translate: `-${value}%` }}>
            {data.map((item) => (
                    <img
                    key={item.id}
                        className="w-40 "
                        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${item.imageId}`}
                        alt=""
                    />
                ))}
            </div>
    </div>
  )
}

export default WhatOnMind