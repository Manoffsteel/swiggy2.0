import React from 'react'
import { IoStarSharp } from "react-icons/io5";

function SearchRestaurant ({ data: {card: {
    card: {
      info: {
        id,
        cloudinaryImageId,
        costForTwoMessage,
        cuisines,
        promoted=false,
        aggregatedDiscountInfoV3={},
        name,
        avgRating,
        sla: { slaString },
      },
    },
  },
}}) {
    // console.log(avgRating)
    return (<div className='bg-white m-4  p-4 flex gap-5 items-center md:max-w-fit'>
       <div className=" w-[30%] ">
                <img
                    className="w-32 h-[120px] rounded-lg"
                    src={
                        "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_264,h_288,c_fill/" +
                        cloudinaryImageId
                    }
                    alt=""
                />
            </div>
            <div className="w-[95%] mt-6 mb-6">
                <p className="font-bold line-clamp-1">By {name}</p>
                <p className="my-1 flex items-center text-gray-700 text-sm">
                    {" "}
                    <IoStarSharp /> {avgRating} .{" "}{slaString} .{" "}
                    {costForTwoMessage} 
                </p>
                <p className="line-clamp-1 text-gray-500">{cuisines.join(", ")}</p>
            </div>

       </div> )
}

export default SearchRestaurant