import { signInWithPopup, signOut } from "firebase/auth";
import React from "react";
import { auth, provider } from "../config/firebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { addUserData, removeUserData } from "../utils/authSlice";
import { togglePopup } from "../utils/popupSlice"; // Import from popupSlice
import { useNavigate } from "react-router-dom";

function SigninBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.authSlice.userData);

  async function handleAuth() {
    try {
      let data = await signInWithPopup(auth, provider);
      const userData = {
        name: data.user.displayName,
        photo: data.user.photoURL,
      };
      dispatch(addUserData(userData));
      dispatch(togglePopup()); // Toggle popup visibility after login
      navigate("/"); // Redirect to home after login
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(removeUserData());
      dispatch(togglePopup()); // Toggle popup visibility after logout
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <>
      {userData ? (
        <button
          onClick={handleLogout}
          className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={handleAuth}
          className="my-5 w-full text-2xl p-5 bg-[#fc8019] text-white"
        >
          Login with GOOGLE
        </button>
      )}
    </>
  );
}

export default SigninBtn;
