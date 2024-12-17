import React, { useContext, useEffect, useState } from "react";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import WhatOnMind from "./WhatOnMind";
import TopRestaurant from "./TopRestaurant";
import OnlineFoodDelivery from "./OnlineFoodDelivery";
import { Coordinates } from "../App"; // Adjust the path
import { useSelector } from "react-redux";
import Shimmer from "./Shimmer";


const Body = () => {
  const [topRestaurantData, setRestaurantData] = useState([]);
  const [onYourMind, setonYourMind] = useState([]);
  const [topResTitle, setTopResTitle] = useState("");
  const [onlineTitle, setOnlineTitle] = useState("");
  const [data, setData] = useState({});

  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
      );
      
        // `http://localhost:5009/api/restaurants/list?lat=${lat}&lng=${lng}`
     

      // https://www.swiggy.com/mapi/restaurants/list/v5?offset=0&is-seo-homepage-enabled=true&lat=19.038045&lng=73.068198&carousel=true&third_party_vendor=1
      const result = await response.json();
      console.log(result)

      setTopResTitle(result?.data?.cards[1]?.card?.card?.header?.title || "");
      
      setOnlineTitle(result?.data?.cards[2]?.card?.card?.title || "");

      setData(result.data || {});

      let mainData=(result?.data?.cards.find(data=>data?.card?.card?.id=="top_brands_for_you")?.card?.card?.gridElements?.infoWithStyle ?.restaurants)

      let mainData2=(result?.data?.cards.find(data=>data?.card?.card?.id=="restaurant_grid_listing")?.card?.card?.gridElements?.infoWithStyle ?.restaurants)
        
        // console.log(mainData)
        console.log(mainData2)
        
      setRestaurantData(mainData || mainData2); //kuki chota devise mein name  chg ha 

      let data2=(result?.data?.cards.find(data=>data?.card?.card?.id=="whats_on_your_mind")?.card?.card?.imageGridCards?.info || [])

      setonYourMind(data2);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setRestaurantData([]);
      setonYourMind([]);
      setData({});
    }
  };

  useEffect(() => {
    fetchData();
  }, [lat, lng]);

  const filterVal = useSelector((state) => state?.filterSlice?.filterVal);

  const filteredData = Array.isArray(topRestaurantData)
    ? topRestaurantData.filter((item) => {
        if (!filterVal) return true;

        switch (filterVal) {
          case "Ratings 4.0+":
            return item?.info?.avgRating > 4;
          case "Rs. 300-Rs. 600":
            return (
              item?.info?.costForTwo?.slice(1, 4) >= "300" &&
              item?.info?.costForTwo?.slice(1, 4) <= "600"
            );
          case "Offers":
            return item?.info?.aggregatedDiscountInfoV3 !== undefined;
          case "Less than Rs. 300":
            return item?.info?.costForTwo?.slice(1, 4) < "300";
          default:
            return true;
        }
      })
    : [];

  if (data.communication || data.tid === "") {
    return (
      <div className="flex mt-52 gap-4 overflow-hidden justify-center items-center flex-col">
        <img
          className="w-72"
          src="https://media.tenor.com/lLbmBFJfW3UAAAAM/crying-sad.gif"
          alt="Crying GIF"
        />
        <div>
          <audio
            src="/Aadi Aadi Meme Audio Download.m4r"
            controls
            autoPlay
          ></audio>
        </div>
        <h1 className="text-3xl">Bhai Khud se bana kar kha le😗😗</h1>
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {
        // applying shimmer
        topRestaurantData.length ? (<div className=" w-[90%] md:w-[80%] mx-auto mt-4 overflow-hidden">
          <WhatOnMind data={onYourMind}></WhatOnMind>
          <hr className="mt-7 border-t-1" />
          <TopRestaurant
            data={topRestaurantData}
            title={topResTitle}
          ></TopRestaurant>
          <hr className="mt-5 border-t-1" />
          <OnlineFoodDelivery
            data={filterVal ? filteredData : topRestaurantData}
            title={onlineTitle}
          />
        </div>) : <Shimmer></Shimmer>
      }
      
    </div>
  );
};

export default Body;

