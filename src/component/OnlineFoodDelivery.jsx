
import React, { useState } from 'react';
import RestaurantCard from './RestaurantCard';
import { FaStar } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { setFilterValue } from '../utils/filterSlice';
import { RxCross2 } from "react-icons/rx";


const OnlineFoodDelivery = ({ data ,title }) => {

  const filterOptions = ["Ratings 4.0+","Rs. 300-Rs. 600","Offers","Less than Rs. 300",]

  const [activeBtn, setActiveBtn ] = useState(null)

  const dispatch = useDispatch()
  function handleFilterBtn (filterName) {
    setActiveBtn(activeBtn === filterName  ? null : filterName)
  dispatch(setFilterValue(activeBtn)) 

  }




  return (
    <div>
      <h1 className="font-bold text-2xl mt-8 mb-8">
        {/* Restaurants with online food delivery in Muzaffarpur */}
        {title} 
        </h1>

        {/*filter button */}
        <div className="my-7 flex flex-wrap gap-3">
                {
                    filterOptions.map((filterName,i) => (
                        <button key={i} onClick={() => handleFilterBtn(filterName)} className={"filterBtn flex gap-2 " + (activeBtn === filterName ? "active" : "")}>
                            <p>{filterName}</p>
                            {/* <i className="fi text-sm mt-1 fi-br-cross hidden"></i> */}
                            <RxCross2 className='text-sm mt-1 hidden' />
                        </button>
                    ))
                }
                
            </div>

        <div className="grid grid-cols-1 mx-3 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
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

export default OnlineFoodDelivery;
