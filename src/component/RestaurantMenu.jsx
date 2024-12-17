import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { GiChestnutLeaf } from "react-icons/gi";
// sadcn se le rhe
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import MenuData from "./MenuData";
import { Coordinates } from "@/App";
import axios from "axios";
import { MenuShimmer } from "./Shimmer";

const RestaurantMenu = () => {
  const { id } = useParams();
  // console.log(id.split('-rest')[1])
  let mainid = id.split("-rest")[1];

  const [resInfo, setResInfo] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  // niche wale ke liye
  const [value, setValue] = useState(0);

  // api context use kr rhe
  const { coord: { lat, lng } } = useContext(Coordinates);

  // Button move yani translate ka function
  function handleNext() {
    // Prevent moving beyond the maximum value (124)
    value >= 124 ? "" : setValue((prev) => prev + 31);
  }

  function handlePrev() {
    // Prevent moving below the minimum value (0)
    value <= 0 ? "" : setValue((prev) => prev - 31);
  }

  async function fetchMenu() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${mainid}&catalog_qa=undefined&submitAction=ENTER`
      );

      let data = response.data;
      // console.log(data?.data?.cards[0]?.card?.card?.text);
      // setMenuData(data?.data?.cards[0]?.card?.card?.text)
      // console.log(data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers);
      const resInfo=(data?.data?.cards[2]?.card?.card?.info)
      setResInfo(data?.data?.cards[2]?.card?.card?.info);
      setDiscountData(
        data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
      );
      // console.log(
      //   data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]
      //     ?.card?.card
      // );
      // menu data sb mein nhi ha filter lga kr jisme jisme ha vo abstract krlo
      let actualMenu =
        (data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards).filter(
          (data) => data?.card?.card?.itemCards
        );
      // console.log(actualMenu);

      setMenuData(actualMenu);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  }

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="w-full">

      {
        menuData.length ? <div className="w-[800px] mx-auto pt-8">
        {/* yeh ban gya uper ka chota ka address ka info */}
        <p className="text-[12px] text-slate-500">
          <Link to={"/"}>
            <span className="hover:text-slate-700 cursor-pointer">Home</span>
          </Link>{" "}
          /
          <Link to={"/"}>
            <span className="hover:text-slate-700 cursor-pointer">
              {resInfo.city}
            </span>
          </Link>{" "}
          /<span className="text-slate-700">{resInfo.name}</span>
          {console.log(resInfo.name)}
        </p>
        {/* yeh uske niche wala */}
        <h1 className="font-bold pt-6 text-2xl">{resInfo.name}</h1>

        {/* ab niche vo card de rha */}
        <div className="w-full h-[230px] bg-gradient-to-t px-4 pb-4 from-slate-200/70  mt-3 rounded-[30px]">
          <div className="w-full border  border-slate-200/70 rounded-[30px] h-full bg-white ">
            <div className="p-4 w-full">
              <div className="flex items-center gap-1 font-semibold">
                <FaRegStar className="text-green-600 text-lg" />
                <span>{resInfo.avgRating}</span>
                <span>({resInfo.totalRatingsString})</span>.
                <span>{resInfo.costForTwoMessage}</span>
              </div>
              {/* orange wala jo ha name vo */}
              <p className="underline font-semibold text-orange-600 mt-2">
                {resInfo?.cuisines?.join(", ")}
              </p>
              {/* outlet wala jo ha vo */}

              <div className="flex gap-2 mt-2">
                <div className="w-[9px] flex flex-col justify-center items-center">
                  <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                  <div className="w-[1px] h-[25px] bg-gray-500 "></div>
                  <div className="w-[7px] h-[7px] bg-gray-500 rounded-full"></div>
                </div>
                <div className="flex flex-col gap-1 text-sm font-semibold">
                  <p>
                    Outlet{" "}
                    <span className="text-gray-500 font-normal">
                      {resInfo.locality}
                    </span>
                  </p>
                  <p>{resInfo.sla?.slaString}</p>
                </div>
              </div>
            </div>
            <hr className="mt-4" />
            {/* niche one wala orange me jo ha */}

            <div className="flex ml-5 mt-3 mb-2  items-center ">
              <span>
                <img
                  className="h-7 w-11"
                  src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_86,h_30/v1634558776/swiggy_one/OneLogo_3x.png"
                  alt="one wala swiggy png"
                />
              </span>
              <div className="ml-3 text-orange-600">
                <p>Free delivery on orders above ₹199</p>
              </div>
            </div>
          </div>
        </div>
        {/* yaha copy paste kr rhe whi chig jo head me banye the or arrow do */}

        <div className="w-full overflow-hidden">
          <div className="flex justify-between mt-8">
            <h1 className="font-bold text-xl">Deals for you</h1>

            <div className="flex gap-3 text-2xl cursor-pointer text-gray-700     ">
              <div className="hover:text-orange-500" onClick={handlePrev}>
                <FaRegArrowAltCircleLeft />
              </div>
              <div className="hover:text-orange-500" onClick={handleNext}>
                <FaRegArrowAltCircleRight />
              </div>
            </div>
          </div>
          <div
            className={`flex gap-4 mt-5 duration-500`}
            style={{ translate: `-${value}%` }}
          >
            {discountData.map((data, i) => (
              <Discount data={data} key={i} />
            ))}
          </div>
        </div>
        {/* yaha se menu jo likh kr aarha vo  or do leaf lga rhe*/}
        <div className="flex items-center text-center justify-center mt-4 gap-1 text-slate-700">
          <GiChestnutLeaf />
          <h2>MENU</h2>
          <GiChestnutLeaf />
        </div>

        {/* ab seach or dishes wala div */}
        <div className="w-full  mt-5 relative cursor-pointer items-center">
          <div className="w-full p-3 rounded-xl  text-[17px] bg-slate-100 text-slate-600 text-center ">
            Search for dishes
          </div>
          <IoIosSearch className="absolute top-4 right-3 text-2xl  text-slate-600" />
        </div>

        {/* yaha pe menu data le rhe  yeh bht main part ha time lga ha esme bhut */}

        {/* <MenuData menuData={menuData} /> */}
        <MenuData menuData={menuData} resInfo={resInfo} />


        {/* accordion khtm */}
      </div> : <MenuShimmer></MenuShimmer>
      }
      
    </div>
  );
};

// fun bna kr destructor kr rhe data kaha pe ha log krwa ke
function Discount({
  data: {
    info: { header, offerLogo, couponCode },
  },
}) {
  // console.log(header);
  return (
    <div className="flex gap-2  min-w-[328px] border p-3 h-[76px] rounded-2xl">
      <img
        src={
          "https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/" +
          offerLogo
        }
        alt="offr"
        className="h-14 w-14"
      />
      <div className="text-slate-600 pt-3">
        <p className="text-lg font-semibold">{header}</p>
        <p className="text-sm font-semibold text-slate-500">Use code {couponCode}</p>
      </div>
    </div>
  );
}

export default RestaurantMenu;