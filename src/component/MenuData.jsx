import React, { useState, useEffect, useContext } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaLeaf } from "react-icons/fa"; // For Veg Icon
import { GiChickenLeg } from "react-icons/gi"; // For Non-Veg Icon

import AddToCartBtn from "./AddToCartBtn";

const MenuData = ({ menuData, resInfo }) => {
  // console.log(menuData)
  return (
    <div>
      <Accordion type="single" collapsible className="w-full">
        {menuData.map(
          ({
            card: {
              card: { itemCards, title },
            },
          }) => (
            <AccordionItem key={title} value={title}>
              {/* Accordion Header */}
              <AccordionTrigger className="text-lg font-bold">
                {title} ({itemCards.length})
              </AccordionTrigger>

              {/* Accordion Content */}
              <AccordionContent>
                <div className="pl-4">
                  {itemCards.map(({ card: { info } }, index) => {
                    const {
                      id,
                      name,
                      description,
                      finalPrice,
                      price,
                      defaultPrice,
                      isVeg,
                      ribbon,
                      imageId,
                    } = info;

                    // Render each item card
                    return (
                      <div
                        key={index}
                        className="border-b py-4 flex items-center justify-between text-slate-700 relative gap-6"
                      >
                        {/* Details Section */}
                        <div className="flex-1">
                          {/* Name and Ribbon */}
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold">{name}</h3>
                            {ribbon?.text && (
                              <span
                                style={{
                                  backgroundColor: ribbon.topBackgroundColor,
                                  color: ribbon.textColor,
                                }}
                                className="px-3 py-1 rounded text-sm"
                              >
                                {ribbon.text}
                              </span>
                            )}
                          </div>

                          {/* Veg/Non-Veg Icon */}
                          <div className="absolute top-0 left-1 flex items-center gap-1 bg-opacity-80 px-2 py-1 rounded-full shadow-sm ">
                            {isVeg ? (
                              <FaLeaf className="text-green-600" size={18} />
                            ) : (
                              <GiChickenLeg
                                className="text-red-600"
                                size={18}
                              />
                            )}
                            <span className="text-sm font-semibold text-gray-800">
                              {isVeg ? "Veg" : "Non-Veg"}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="text-sm text-gray-500 mt-1">
                            {description}
                          </p>

                          {/* Price Section */}
                          <div className="flex items-center gap-2 mt-2">
                            {/* Handle different price cases */}
                            {price || finalPrice || defaultPrice ? (
                              <>
                                {/* Case 1: Both price and finalPrice available */}
                                {price && finalPrice && (
                                  <>
                                    <span className="text-sm line-through text-gray-500">
                                      ₹{price / 100}
                                    </span>
                                    <span className="text-lg font-bold text-green-600">
                                      ₹{finalPrice / 100}
                                    </span>
                                  </>
                                )}

                                {/* Case 2: Only price is available */}
                                {price && !finalPrice && (
                                  <span className="text-lg font-bold text-green-600">
                                    ₹{price / 100}
                                  </span>
                                )}

                                {/* Case 3: Only finalPrice is available */}
                                {!price && finalPrice && (
                                  <span className="text-lg font-bold text-green-600">
                                    ₹{finalPrice / 100}
                                  </span>
                                )}

                                {/* Case 4: Fallback to defaultPrice */}
                                {!price && !finalPrice && defaultPrice && (
                                  <span className="text-lg font-bold text-green-600">
                                    ₹{defaultPrice / 100}
                                  </span>
                                )}
                              </>
                            ) : (
                              <span className="text-gray-500">
                                Price unavailable
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Image Section */}
                        <div className="relative w-40 h-40">
                          {/* Image */}
                          <img
                            src={
                              imageId
                                ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                                : "https://via.placeholder.com/150"
                            }
                            alt={name}
                            className="w-full h-full rounded-lg object-cover"
                          />

                          {/* Add Button */}

                          <AddToCartBtn
                            item={{
                              id,
                              name,
                              price: finalPrice || price || defaultPrice,
                              imageId,
                              isVeg,
                            }}
                            restaurantId ={{
                              id: resInfo.id,
                              name: resInfo.name,
                              title,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          )
        )}
      </Accordion>
    </div>
  );
};

export default MenuData;
