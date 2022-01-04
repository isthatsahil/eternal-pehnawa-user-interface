import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);

// Create a function that can be called when a "pay now" button is clicked
export const payNow = () => {
  // Now is a good time to to disable the button used to open the modal

  const razorpay = new Razorpay({
    key: "rzp_test_zZnqo2alkhhRXk", // The Razorpay "key_id" that you generated
    amount: 100, // The value of the order in cents/subunits of your currency
    currency: "INR", // The currency to use
    name: "My store", // The name of the merchant
    prefill: {
      // email: orderDetails.customer.email, // Provide the email address that you may have captured in the checkout form (Optional)
      // Other options are available here. See the docs here https://razorpay.com/docs/payment-gateway/web-integration/standard/checkout-options/
    },
    modal: {
      ondismiss() {
        // Handle what happens when the customer dismisses the payment form without completing the payment. This may
        // involve re-enabling a "pay now" button if you disable it when it's clicked.
      },
    },
    handler(response) {
      // This function is called when the customer finishes the payment succesfully. Chec/Commerce.js need the
      // razorpay_payment_id to capture the order and complete the payment

      // Use a checkout token ID that was generated earlier and any order details that may have been
      // collected on this page. Note that Commerce.js checkout tokens may already have all the information saved
      // against them to capture an order, so this extra detail may be optional.
      commerce.checkout
        .capture(checkoutTokenId, {
          ...orderDetails,
          payment: {
            gateway: "razorpay",
            razorpay: {
              payment_id: response.razorpay_payment_id,
            },
          },
        })
        .then((order) => {
          // Payment and order capture was successful, and the order detail is provide in the order variable.
          console.log(order);
        })
        .catch((response) => {
          // Capturing the order failed. The payment attempt should still be availabe in Razorpay as an auth, but not
          // fully charged.
          console.log(response);
          alert(response.message);
        });
    },
  });

  // Razorpay is configured, we need to add some error handling for when the payment fails with Razorpay
  razorpay.on("payment.failed", (response) => {
    console.log(response);
    alert(response.error.reason);
  });

  // Show the razorpay window immediately
  razorpay.open();
};
