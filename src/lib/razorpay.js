const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const initRazorOrder = async (orderAmounr) => {
  console.log(process.env.RAZORPAY_KEY);
  const payment_capture = 1;
  const amount = orderAmounr;
  const currency = "INR";

  const options = {
    amount: (amount * 100).toString(),
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };

  try {
    const response = await razorpay.orders.create(options);
    return response;
  } catch (error) {
    console.log("error", error);
  }
};

//initRazorOrder(100).then((res) => console.log(res));
