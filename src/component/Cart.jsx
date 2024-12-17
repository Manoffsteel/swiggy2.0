import React, { useContext, useState } from "react";
import { CartContext } from "../App";
import { FaLeaf } from "react-icons/fa"; // Veg Icon
import { GiChickenLeg } from "react-icons/gi"; // Non-Veg Icon
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector
import { toogleLogin } from "../utils/popupSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import RazorpayButton from "./RazorpayButton";

const Cart = () => {
  const { cartData, setCartData } = useContext(CartContext);

  // Handle quantity increment
  const incrementQuantity = (id) => {
    setCartData((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle quantity decrement
  const decrementQuantity = (id) => {
    setCartData(
      (prevCart) =>
        prevCart
          .map((item) =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
          .filter((item) => item.quantity > 0) // Remove if quantity is 0
    );
  };

  // Handle remove item from cart
  const removeItem = (id) => {
    setCartData((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Calculate total price
  const totalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate GST (5%)
  const gstAmount = totalPrice * 0.05;

  // Calculate the total price with GST
  const totalWithGST = totalPrice + gstAmount;

  // To navigate to the main page
  const navigate = useNavigate();

  const handleGoToMainPage = () => {
    navigate('/'); // Navigate to the main page ("/")
  };

  const userData = useSelector((state) => state.authSlice.userData);

  // Add null check for userData and photo
  const userPhoto = userData?.photo;

  const dispatch = useDispatch();

  // State to conditionally render Razorpay Button
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handlePlaceOrder = () => {
    if (!userData) {
      dispatch(toogleLogin(true));  // Open login popup if user is not logged in
      toast.warning("Login kr le bhai!");
      return;
    }

    // Order placement logic
    console.log("Order placed successfully!");
    toast.info("Udhari nahi chalega bhai, pehle bata rhe!");

    // Show RazorpayButton by toggling state
    setIsOrderPlaced(false);//Unmount RazorpayButton
    setTimeout(() => setIsOrderPlaced(true), 0);//Remount RazorpayButton
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Empty Cart Message */}
      {cartData.length === 0 ? (
        <div className="bg-white w-full">
          <div className="flex items-center justify-center">
            <img
              src="/empty.png"
              alt="empty"
              style={{ width: '400px', height: '500px' }}
            />
          </div>

          {/* Button to navigate to the main page */}
          <div className="flex justify-center mt-4">
            <button
              onClick={handleGoToMainPage}
              className="bg-orange-600 text-white px-8 py-2 rounded-lg shadow-lg hover:bg-orange-700 transition"
            >
              See restaurant near you
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Cart Items */}
          {cartData.map(
            ({ id, name, price, quantity, imageId, isVeg }) => (
              <div
                key={id}
                className="flex items-center bg-white p-4 rounded-lg shadow-md"
              >
                {/* Item Image */}
                <img
                  src={
                    imageId
                      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`
                      : "https://via.placeholder.com/100"
                  }
                  alt={name}
                  className="w-20 h-20 rounded-lg object-cover"
                />

                {/* Item Details */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold">{name}</h3>
                    {isVeg ? (
                      <FaLeaf className="text-green-600" size={16} />
                    ) : (
                      <GiChickenLeg className="text-red-600" size={16} />
                    )}
                  </div>
                  <p className="text-sm text-gray-500">₹{price / 100} each</p>
                  <p className="text-sm font-bold mt-1">
                    Total: ₹{(price * quantity) / 100}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-gray-200 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
                    onClick={() => decrementQuantity(id)}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">{quantity}</span>
                  <button
                    className="bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-green-700 transition"
                    onClick={() => incrementQuantity(id)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Item */}
                <button
                  className="ml-4 text-red-600 hover:text-red-800"
                  onClick={() => removeItem(id)}
                >
                  Remove
                </button>
              </div>
            )
          )}

          {/* Total Price Section */}
          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Subtotal: ₹{totalPrice / 100}</h3>
            <h3 className="text-lg text-gray-500">GST (5%): ₹{gstAmount / 100}</h3>
            <h3 className="text-xl font-bold mt-4">Final Total: ₹{totalWithGST / 100}</h3>

            <button 
              onClick={handlePlaceOrder} 
              className="bg-green-600 text-white px-6 py-2 mt-2 rounded-lg font-medium hover:bg-green-700 transition"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Conditionally render RazorpayButton after order is placed */}
      {isOrderPlaced && <RazorpayButton amount={totalWithGST / 100} />}
    </div>
  );
};

export default Cart;
