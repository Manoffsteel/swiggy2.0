import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantCard = (restaurants) => {
  // console.log(restaurants)   //ye data kaam aaega cart mein
  // restaurants?.info.id
    // console.log(restaurants.link.split("/")[4]+ restaurants.link.split("/")[5])
  return (
    <Link to={`/restaurantMenu/${restaurants.link.split("/").at(-2)+ restaurants.link.split("/").at(-1)}`}>

    <div className="min-w-[295px] h-[182px] relative cursor-pointer">
    <img
      className="w-full h-full  rounded-2xl object-cover "
      src={
        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/" +
        restaurants?.info?.cloudinaryImageId
      }
      alt="topres"
    />
     

    {/* <p>hello</p> */}
    {/* gradient effect daal rhe */}
    <div className="bg-gradient-to-t from-black from-1% to-transparent to-40%  rounded-2xl w-full h-full  absolute top-0"></div>
    {/* esse tarha style krna ha */}
    {/* <p className='absolute bottom-0 text-white'>hello</p> */}
    <p className="absolute bottom-0 text-white text-2xl ml-2 mb-1 font-bold">
      {restaurants?.info?.aggregatedDiscountInfoV3?.header}{" "}
      {restaurants?.info?.aggregatedDiscountInfoV3?.subHeader}
    </p>
    
    {/* scrnshot lga rhe yaha pe card ke uper */}
    <img  className="absolute top-2 h-10 rounded-md " src="/oneWala.png" alt="one wala " />
    {/* <p>{console.log(restaurants)}</p> */}
  </div>
    </Link>
    
  )
}

export default RestaurantCard
