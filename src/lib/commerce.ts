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
