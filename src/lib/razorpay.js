const Razorpay = require("razorpay");
const shortid = require("shortid");

const razorpay = new Razorpay({
  key_id: "rzp_test_cpzoOO9ENQFvwc",
  key_secret: "zE3rRtXnkNpv34nxgEbdvzX6",
});

export const initRazorOrder = async (orderAmounr) => {
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
