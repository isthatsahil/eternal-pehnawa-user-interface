const Razorpay = require("razorpay");
const shortid = require("shortid");

exports.handler = async (event, context) => {
  const bodyData = JSON.parse(event.body);
  const razorpay = new Razorpay({
    key_id: "rzp_test_p0ZICn7aXIcYnc",
    key_secret: "EVM1PGIJB8o117Q8MYYIKuov",
  });

  // Create an order -> generate the OrderID -> Send it to the Front-end

  const amount = Math.round(bodyData?.orderAmount * 100);
  const currency = "INR";
  const options = {
    amount: amount.toString(),
    currency,
    receipt: shortid.generate(),
  };
  let finalResponse = {};
  try {
    const response = await razorpay.orders.create(options);
    finalResponse = {
      id: response.id,
      currency: response.currency,
      amount: response.amount,
    };
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }

  const headers = {
    "Access-Control-Allow-Origin": "*",
  };
  return {
    statusCode: 200, // <-- Must be 200 otherwise pre-flight call fails
    headers,
    body: JSON.stringify(finalResponse),
  };
};
