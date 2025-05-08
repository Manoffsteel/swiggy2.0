// // Use import instead of require
// import express from 'express';
// import Razorpay from 'razorpay';
// import cors from 'cors';

// const app = express();
// app.use(express.json());
// app.use(cors());

// const razorpay = new Razorpay({
//   // key_id: "rzp_test_62lfJDM065Qw88", 
//   key: "rzp_test_8W21nCOmu1eVOx", 
//   // Replace with your Razorpay key ID
//   // key_secret: "FUJ7IyeNkQK1WkUdakQ4RJgt",
//    // Replace with your Razorpay key secret
//    key_secret: "FSHP5CkUZkdrcEbt9XoODKP",
// });

// app.post("/create-order", async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: amount * 100,
//     currency: "INR",
//     receipt: "order_rcptid_11",
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Something went wrong!");
//   }
// });

// const PORT = process.env.PORT || 5003;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// Import packages
// import express from 'express';
// import Razorpay from 'razorpay';
// import cors from 'cors';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();
// console.log("Key ID:", process.env.RAZORPAY_KEY_ID);
// console.log("Key Secret:", process.env.RAZORPAY_KEY_SECRET);


// const app = express();
// app.use(express.json());
// app.use(cors());

// // Initialize Razorpay with keys from .env
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// app.post("/create-order", async (req, res) => {
//   const { amount } = req.body;

//   const options = {
//     amount: amount * 100,  // amount in paise
//     currency: "INR",
//     receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
//   };

//   try {
//     const order = await razorpay.orders.create(options);
//     res.json(order);
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     res.status(500).json({ error: "Something went wrong!" });
//   }
// });

// const PORT = process.env.PORT || 5003;
// app.listen(PORT, () => {
//   console.log(`✅ Server is running on port ${PORT}`);
// });
import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

// ✅ Enable CORS only for your frontend domain
app.use(cors({
  origin: 'https://swiggy2-0-htgb.vercel.app',
  methods: ['GET', 'POST'],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Something went wrong!" });
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});







