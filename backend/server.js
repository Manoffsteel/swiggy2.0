// Use import instead of require
import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
  key_id: "rzp_test_62lfJDM065Qw88", // Replace with your Razorpay key ID
  key_secret: "FUJ7IyeNkQK1WkUdakQ4RJgt", // Replace with your Razorpay key secret
});

app.post("/create-order", async (req, res) => {
  const { amount } = req.body;

  const options = {
    amount: amount * 100,
    currency: "INR",
    receipt: "order_rcptid_11",
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong!");
  }
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



