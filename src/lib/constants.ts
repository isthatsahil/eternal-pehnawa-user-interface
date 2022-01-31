/**
 * * COMMERCE JS AUTHENTICATION
 */

/**
 * ! The public API key can only be used on the products, cart, and checkout resources.
 */
export const COMMERCE_JS_BASE_URL = "https://api.chec.io/v1";
export const COMMERCE_JS_HEADER = {
  "X-Authorization": process.env.REACT_APP_CHEC_PUBLIC_KEY,
  "Content-Type": "application/json",
  Accept: "application/json",
};

export const COMMERCE_JS_SECRET_HEADER = {
  "X-Authorization": "sk_test_360704e550bcf2b26bfddea1f6b0079873a0de63b96dc",
  "Content-Type": "application/json",
  Accept: "application/json",
};
