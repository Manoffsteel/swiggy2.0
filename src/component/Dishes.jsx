import React from "react";
import { IoStarSharp } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { FaLeaf } from "react-icons/fa"; // For Veg Icon
import { GiChickenLeg } from "react-icons/gi"; // For Non-Veg Icon
import { MdOutlineCurrencyRupee } from "react-icons/md";
import AddToCartBtn from "./AddToCartBtn";

function Dishes({
  data: {
    card: {
      card: {
        info: { imageId = "", name = "", price = 0, isVeg = 0 } = {}, // Fallback to avoid undefined destructuring
        restaurant: {
          info: {
            id: restaurantId = "", // Renamed to restaurantId for clarity
            name: resName = "",
            avgRating = 0,
            sla: { slaString = "" } = {},
          } = {},
        } = {},
      } = {},
    } = {},
  },
}) {
  return (
    <div className="bg-white rounded-2xl p-4 m-4">
      {/* Restaurant Info */}
      <div className="flex justify-between text-sm opacity-50">
        <div>
          <p className="font-bold">By {resName}</p>
          <p className="my-2 flex items-center gap-1">
            <IoStarSharp /> {avgRating} . {slaString}
          </p>
        </div>
        <FaArrowRight className="text-2xl" />
      </div>
      <hr className="border-dotted" />

      {/* Dish Details */}
      <div className="my-3 max-w-fit flex justify-between">
        <div className="w-[50%]">
          {/* Veg/Non-Veg Icon */}
          <div>
            {isVeg ? (
              <FaLeaf className="text-green-600" />
            ) : (
              <GiChickenLeg className="text-red-600" />
            )}
          </div>

          {/* Dish Name */}
          <p className="font-medium">{name}</p>

          {/* Dish Price */}
          <p className="flex items-center">
            <MdOutlineCurrencyRupee className="inline-block" />
            {price / 100}
          </p>

          {/* More Details Button */}
          <button className="px-4 py-1 w-max rounded-3xl border">
            More Details
          </button>
        </div>

        {/* Dish Image & Add to Cart Button */}
        <div className="w-[40%] md:w-[40%] relative h-full">
          <img
            className="rounded-xl object-cover aspect-square"
            src={
              imageId
                ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                : "https://via.placeholder.com/150"
            }
            alt={name}
          />

          {/* Add to Cart Button */}
          <AddToCartBtn
            item={{
              id: restaurantId, // Using restaurantId as dish ID placeholder
              name,
              price,
              imageId,
              isVeg,
            }}
            restaurantId={restaurantId} // Correctly passing restaurant ID
          />

          {/* <AddToCartBtn
            item={{
              id,
              name,
              price: finalPrice || price || defaultPrice,
              imageId,
              isVeg,
            }}
            restaurantId={{
              id: resInfo.id,
              name: resInfo.name,
              title,
            }}
          /> */}
        </div>
      </div>
    </div>
  );
}

export default Dishes;
