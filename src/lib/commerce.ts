import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
  process.env.REACT_APP_CHEC_PUBLIC_KEY,
  true
);

export const login = () => {
  commerce.customer
    .login("sahil.verma997@gmail.com", "http://localhost:3001/")
    .then((token) => {
      console.log("token", token);
    });
};
