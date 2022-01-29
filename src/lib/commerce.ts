import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  "pk_36070c809d0424b5962d42ef106bee39723ae3a6e803c",
  "development"
);

export const login = () => {
  commerce.customer
    .login("sahil.verma997@gmail.com", "http://localhost:3001/")
    .then((token) => {
      console.log("token", token);
    });
};

//const completeOrder = async () => {
// const res = await initializeRazorpay();
// if (!res) {
//   alert("Razorpay SDK Failed to load");
//   return;
// }

//   const razorpay = new Razorpay({
//     key: "rzp_test_cpzoOO9ENQFvwc", // The Razorpay "key_id" that you generated
//     amount: 5000, // The value of the order in cents/subunits of your currency
//     currency: "INR", // The currency to use
//     name: "Eternal Pehnawa", // The name of the merchant
//     modal: {
//       ondismiss() {
//         // Handle what happens when the customer dismisses the payment form without completing the payment. This may
//         // involve re-enabling a "pay now" button if you disable it when it's clicked.
//       },
//     },
//     handler(response: { razorpay_payment_id: any }) {
//       // This function is called when the customer finishes the payment succesfully. Chec/Commerce.js need the
//       // razorpay_payment_id to capture the order and complete the payment
//       // Use a checkout token ID that was generated earlier and any order details that may have been
//       // collected on this page. Note that Commerce.js checkout tokens may already have all the information saved
//       // against them to capture an order, so this extra detail may be optional.
//     },
//   });
//   // Razorpay is configured, we need to add some error handling for when the payment fails with Razorpay
//   razorpay.on("payment.failed", (response) => {
//     console.log(response);
//     alert(response.error.reason);
//   });

//   // Show the razorpay window immediately
//   razorpay.open();}
