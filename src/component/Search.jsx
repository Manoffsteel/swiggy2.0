import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Dishes from './Dishes'
import SearchRestaurant from "./SearchRestaurant";
import { Coordinates } from "../App"; // Adjust the path kuki context folder kaam ka nhi




const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filterOptions = ["Restaurant", "Dishes"];

  const [activeBtn, setActiveBtn] = useState("Dishes");

  const [dishes, setDishes] = useState([]);
  const [restaurantData, setRestaurantData] = useState([]);

  function handleFilterBtn(filterName) {
    setActiveBtn(activeBtn === filterName ? activeBtn : filterName);
  }


  const {
    coord: { lat, lng },
  } = useContext(Coordinates);

  async function fetchDishes() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=3e74e22a-60fc-d830-41cc-1e2c0a9b0ae5&submitAction=ENTER&queryUniqueId=74a12a7c-7fc3-9067-30e6-a6054f0d9117`
      );

      let finalData =
        (response.data.data?.cards[1]?.groupedCard?.cardGroupMap?.DISH?.cards).filter(
          (data) => data?.card?.card?.info
        );
      setDishes(finalData);
    } catch (error) {
      console.error("Error fetching dishes:", error);
    }
  }
  async function fetchRestaurantData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/restaurants/search/v3?lat=${lat}&lng=${lng}&str=${searchQuery}&trackingId=3e74e22a-60fc-d830-41cc-1e2c0a9b0ae5&submitAction=ENTER&queryUniqueId=74a12a7c-7fc3-9067-30e6-a6054f0d9117&selectedPLTab=RESTAURANT`
      );

      //   console.log(response.data.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(data=>data?.card?.card?.info);
      const finalData =
        (response.data.data?.cards[0]?.groupedCard?.cardGroupMap?.RESTAURANT?.cards).filter(
          (data) => data?.card?.card?.info
        );
      setRestaurantData(finalData);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  }
  //   console.log(restaurantData)
  useEffect(() => {
    if (searchQuery === "") {
      return;
    }
    fetchDishes();
    fetchRestaurantData();
  }, [searchQuery]);


  function handleSearchQuery(e) {
    let val = e.target.value;
    if (e.keyCode == 13) {
        setSearchQuery(val);
        setSelectedResDish(null);
        setDishes([]);
    }
}

  return (
    <div className="w-full mt-10 md:w-[800px] mx-auto">
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleSearchQuery}
        className="border-2 w-full pl-8 py-3 text-xl focus:outline-none"
        type="text"
        placeholder="Search for restaurant and food"
      />

      <div className="my-7 flex flex-wrap gap-3">
        {filterOptions.map((filterName, i) => (
          <button 
            key={i}
            onClick={() => handleFilterBtn(filterName)}
            className={
              "filterBtn flex gap-2 " +
              (activeBtn === filterName ? "active" : "")
            }
          >
            <p>{filterName}</p>
          </button>
        ))}
      </div>

      {/* here  its starting  */}
      
      <div className="w-full md:w-[800px] mt-5 grid grid-cols-1 md:grid-cols-2 bg-[#f4f5f7]">
  {activeBtn === "Dishes"
    ? dishes.map((data) => (
        <Dishes key={data.id} data={data} />
      ))
    : restaurantData.map((data) => (
        <SearchRestaurant key={data.id} data={data} />
      ))}
</div>
    {/* get res data for dishes */}



      {/* and ending */}
    </div>
  );
};

export default Search;

