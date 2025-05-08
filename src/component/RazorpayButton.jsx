import React, { useEffect, useState } from "react";
const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

const RazorpayButton = ({ amount }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.Razorpay) {
      alert("Razorpay SDK not loaded");
      return;
    }

    if (amount > 0) {
      handlePayment(); // Automatically start the payment process
    } else {
      alert("Amount should be greater than 0");
    }
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handlePayment = async () => {
    setLoading(true);

    const amountInPaisa = Math.round(amount); 
    try {
      const response = await fetch("https://backedswiggyfinal.vercel.app/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amountInPaisa }),
      });

      const data = await response.json();

      if (data.id) {
        const options = {
          // key: "rzp_test_62lfJDM065Qw88", 
          // Replace with your Razorpay key ID
          // key: "rzp_test_8W21nCOmu1eVOx", 
          // key_id: process.env.RAZORPAY_KEY_ID,
          key, // short for key: key
          

          amount: amountInPaisa,
          currency: "INR",
          name: "Ankit",
          description: "Test Transaction",
          order_id: data.id, // Razorpay order ID from backend
          handler: function (response) {
            alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
          },
          prefill: {
            name: "Ankit",
            email: "ankitkumar0410s@gmail.com",
            contact: "7717723216",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      } else {
        alert("Payment creation failed");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("An error occurred while creating the payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <p>Processing payment...</p>} {/* Show this while processing */}
    </div>
  );
};

export default RazorpayButton;


