import React, { useState, useContext, useEffect } from "react";
import { FaChevronDown, FaRegUser } from "react-icons/fa";
import {
  IoBagOutline,
  IoSearch,
  IoFastFoodOutline,
  IoLocationOutline,
} from "react-icons/io5";
import { BiSolidOffer } from "react-icons/bi";
import { TfiHelpAlt } from "react-icons/tfi";
import { Outlet, Link } from "react-router-dom";
import { CartContext, Coordinates } from "../App";
import { useDispatch, useSelector } from "react-redux";
import {
  togglePopup,
  setPopupVisibility,
  toogleLogin,
} from "../utils/popupSlice";
import axios from "axios";
import { auth, provider } from "../config/firebaseAuth";
import { signInWithPopup, signOut } from "firebase/auth";

const navItems = [
  {
    name: "Swiggy Corporate",
    icon: <IoBagOutline />,
    path: "/corporate",
  },
  {
    name: "Search",
    icon: <IoSearch />,
    path: "/search",
  },
  {
    name: "Offers",
    icon: <BiSolidOffer className="text-xl" />,
    path: "/offers",
    badge: "New",
  },
  {
    name: "Help",
    icon: <TfiHelpAlt />,
    path: "/help",
  },
  {
    name: "Sign in",
    icon: <FaRegUser />,
    path: "/signin",
  },
  {
    name: "Cart",
    icon: <IoFastFoodOutline className="text-green-600" />,
    path: "/cart",
  },
];

const Head = () => {
  const isVisible = useSelector((state) => state.popup.isVisible);
  const loginVisible = useSelector((state) => state.popup.loginToggle);

  const userData1 = useSelector((state) => state.authSlice.userData);
  // console.log(userData1)
  const dispatch = useDispatch();

  const [searchResult, setSearchResult] = useState([]);
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const { setCoord } = useContext(Coordinates);
  const { cartData, setCartData } = useContext(CartContext);

  const [userData, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("userData");
    return storedUser ? JSON.parse(storedUser) : null;
    // console.log(storedUser)
  });


  const handleSearchFunction = () => {
    dispatch(togglePopup());
  };

  const handleLogin = () => {
    dispatch(toogleLogin());
  };

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  async function searchResultFun(val) {
    if (val === "") return;
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/misc/place-autocomplete?input=${val}`
      );
      
      
      setSearchResult(res.data.data);
    } catch (error) {
      console.error("Error fetching search results", error);
    }
  }

  async function fetchLatAndLng(id) {
    if (id === "") return;
    dispatch(setPopupVisibility(false));
    try {
      // const res = await axios.get(
      //   `/api/dapi/misc/address-recommend?place_id=${id}`
      // );
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/misc/address-recommend?place_id=${id}`
      );
      setCoord({
        lat: res.data.data[0].geometry.location.lat,
        lng: res.data.data[0].geometry.location.lng,
      });

      setDescription(res.data.data[0].address_components[0].long_name);
      setDescription2(res.data.data[0].address_components[1].long_name);
    } catch (error) {
      console.error("Error fetching latitude and longitude", error);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // ye mil rh lkin bs ek baar
      // console.log(user)
      setCurrentUser({
        name: user.displayName,
        photo: user.photoURL,
        email: user.email,
      });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };
  // console.log(userData)
  // yhi excess krna hoga cart mein
  console.log(userData?.email);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      // yeh jor rhe
      localStorage.removeItem("userData");
      // console.log(userData)
      // console.log("user dtaa nhi ha ")
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      localStorage.setItem("userData", JSON.stringify(userData));
    } else {
      localStorage.removeItem("userData");
    }
  });
  //[userData] yeh andr lga hua tha

  return (
    <>
      {/* Search Popup */}
      <div
        className={`w-full bg-black/50 h-full absolute z-50 ${
          isVisible ? "block" : "hidden"
        }`}
        onClick={handleSearchFunction}
      >
        <div
          className="text-black bg-white p-10 w-[36%]  h-full text-center cursor-pointer duration-700"
          onClick={handleSearchFunction}
        >
          <div className="w-[80%]  ml-14 mt-8">
            <input
              type="text"
              placeholder="Search for area, Street name"
              className="w-full border p-5 focus:outline-none focus:shadow-md h-14"
              onChange={(e) => searchResultFun(e.target.value)}
            />
            <div className="m-2 p-2">
              <ul>
                {searchResult.map((data, index) => (
                  <li
                    className="m-2 p-2"
                    key={index}
                    onClick={() => fetchLatAndLng(data.place_id)}
                  >
                    <div className="flex items-center">
                      <IoLocationOutline className="text-2xl mr-2 flex-shrink-0" />
                      <div>
                        <div className="hover:text-orange-600">
                          {data.structured_formatting.main_text}
                        </div>
                        <p className="text-sm opacity-55">
                          {data.structured_formatting.secondary_text}
                        </p>
                      </div>
                    </div>
                    <hr className="mt-3 border-dotted" />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Login Popup */}

      <div
        className={`fixed top-0 right-0 bg-white p-10 h-full w-[36%] z-50 duration-500 ${
          loginVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
          onClick={handleLogin}
        >
          &times;
        </button>
        <div className="text-black text-center">
          {!userData ? (
            <>
              <h2 className="text-lg font-bold mb-4">Sign in with Google</h2>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                onClick={handleGoogleSignIn}
              >
                Sign in with Google
              </button>
            </>
          ) : (
            <>
              <img
                src={userData.photo}
                alt="User"
                className="w-16 h-16 rounded-full mx-auto mb-4"
              />
              <h2 className="text-lg font-bold">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
              <button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      {/* yaha khtm h login */}

      {/* Header */}
      <div className="relative ">
      <div className="w-full z-40 sticky top-0 shadow-md h-20 flex  justify-start sm:justify-center items-center bg-white ">
          <div className="w-1/2 md:w-[75%]  flex  justify-between">
            <div className="flex items-center  hover:text-orange-600">
              <Link to="/">
                <div className="w-8 h-12  ">
                  <img
                    src="https://www.cdnlogo.com/logos/s/4/swiggy.svg"
                    alt="swigy logo"
                  />
                </div>
              </Link>
              <div className="flex items-center ml-2 sm:ml-0"  onClick={handleSearchFunction}>
                <p className="flex items-center max-w-[180px]  ">
                  <span className="ml-2 text-sm opacity-85 font-bold line-clamp-2">
                    {description || "Muzaffarpur"}
                  </span>
                  <span className="ml-2 text-sm opacity-85">
                    {description2}
                  </span>
                </p>
                <FaChevronDown className="m-4 text-orange-500" />
              </div>
            </div>

            <div className="menu-container hidden 1130px:flex items-center gap-10 1130px:gap-8 overflow-hidden text-gray-700 overflow-y-auto max-h-20">
              {navItems.map((item, index) =>
                item.name === "Sign in" ? (
                  <div
                    onClick={handleLogin}
                    key={index}
                    className="flex hover:text-orange-600 items-center gap-1"
                  >
                    {userData && userData.photo ? (

                      <img
                        src={userData.photo}
                        alt="userphoto"
                        style={{
                          width: "30px",
                          height: "30px",
                          borderRadius: "50%",
                          margin: "2px",
                        }}
                      />
                    ) : (
                      <FaRegUser />
                    )}
                    {/* <p>{item.name}</p> */}
                    {console.log(userData)}
                    <p>{userData ? userData.name : item.name}</p>
                    {item.badge && (
                      <sup className="text-orange-600 text-xs font-semibold ml-1">
                        {item.badge}
                      </sup>
                    )}
                    {item.name === "Cart" && <p>{cartData.length}</p>}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={item.path}
                    className="flex hover:text-orange-600 items-center gap-1"
                  >
                    {item.icon}
                    <p>{item.name}</p>
                    {item.badge && (
                      <sup className="text-orange-600 text-xs font-semibold ml-1">
                        {item.badge}
                      </sup>
                    )}
                    {item.name === "Cart" && <p>{cartData.length}</p>}
                  </Link>
                )
              )}
            </div>

            {/* extra  for Responsiveness */}
            <div className="flex  items-center  justify-center gap-16  1130px:hidden  ">

            {navItems.map((item, index) =>
  // Skip items at index 0, 2, and 3
  [0, 2, 3].includes(index) ? null : (
    item.name === "Sign in" ? (
      <div
        onClick={handleLogin}
        key={index}
        className="flex hover:text-orange-600 items-center gap-1"
      >
        {userData && userData.photo ? (
          <img
            src={userData.photo}
            alt="userphoto"
            style={{
              width: "50px",
              height: "30px",
              borderRadius: "50%",
              margin: "10px",
            }}
          />
        ) : (
          <FaRegUser />
        )}
        {item.name === "Cart" && <p>{cartData.length}</p>}
      </div>
    ) : (
      <Link
        key={index}
        to={item.path}
        className="flex hover:text-orange-600 items-center gap-1"
      >
        {item.icon}
        {item.name === "Cart" && <p>{cartData.length}</p>}
      </Link>
    )
  )
)}

            </div>
            {/* extra end */}


          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Head;

