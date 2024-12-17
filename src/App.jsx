import React, { createContext, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Head from './component/Head';
import Body from './component/Body';
import RestaurantMenu from './component/RestaurantMenu';
import Cart from './component/Cart'; // Import the Cart component
import SigninBtn from './component/SigninBtn';
import Search from './component/Search';

// Import react-toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import Help from './component/Help';

// Centralized Context Declaration
export const Coordinates = createContext();
// dusra context
export const CartContext = createContext([]);

const App = () => {
  const [coord, setCoord] = useState({ lat: 19.038045, lng: 73.068198 }); // Default coordinates

  // cart ke liye
  const [cartData, setCartData] = useState([]); // Store cart data

  return (
    <CartContext.Provider value={{ cartData, setCartData }}>
      <Coordinates.Provider value={{ coord, setCoord }}>
        <div className="app-container">
           {/* ToastContainer for displaying toast notifications */}
           <ToastContainer position="top-center" autoClose={2000} hideProgressBar={true} />
          <Routes>
            {/* Head component wraps other routes */}
            <Route path="/" element={<Head />}>
              {/* Body route */}
              <Route path="/" element={<Body />} />
              {/* RestaurantMenu route */}
              <Route path="/restaurantMenu/:id" element={<RestaurantMenu />} />
              {/* Cart route */}
              <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
              <Route path="/signin" element={<SigninBtn></SigninBtn>} />

              <Route path="/search" element={<Search />} />
              <Route path="/help" element={<Help></Help>} />
              
              
            </Route>
          </Routes>
        </div>
      </Coordinates.Provider>
    </CartContext.Provider>
  );
};

export default App;