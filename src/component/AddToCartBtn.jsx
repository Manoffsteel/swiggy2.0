
import React, { useContext } from "react";
import { CartContext } from "../App";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles

const AddToCartBtn = ({ item, restaurantId }) => {
    console.log(restaurantId.id)
  // Access the cart context (useContext)
  const { cartData, setCartData } = useContext(CartContext);

  const handleAddToCart = () => {
    setCartData((prevCart) => {
      // Check if the cart already contains items from a different restaurant
      if (prevCart.length > 0 && prevCart[0].restaurantId.id !== restaurantId.id) {
        // Clear the previous restaurant's items and add the new restaurant's item
        return [{ ...item, quantity: 1, restaurantId }];
      }

      // Otherwise, just add the item or update the quantity if it already exists
      const itemExists = prevCart.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      // Add the new item to the cart
      return [...prevCart, { ...item, quantity: 1, restaurantId }];
    });

    // Show the toast notification with the item name
    toast.success(`${item.name} has been added to your cart!`);
  };

  return (
    <div>
      <button
        className="absolute left-1/2 bottom-[13px] transform -translate-x-1/2 translate-y-1/2 bg-white text-green-600 px-10 py-3 text-base font-semibold rounded-full shadow-md border border-green-600 hover:bg-green-100 transition"
        onClick={handleAddToCart}
      >
        Add
      </button>
    </div>
  );
};

export default AddToCartBtn;
