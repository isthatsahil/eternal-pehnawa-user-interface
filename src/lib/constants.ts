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
