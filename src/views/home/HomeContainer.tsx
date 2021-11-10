import React from "react";
import { HomeComponent } from "./HomeComponent";
import { motion } from "framer-motion";
import "./home.css"

const exitVariant = {
  exit: {
    opacity: 0,
  },
};
const HomeContainer = () => {
  return (
    <motion.main
      variants={exitVariant}
      exit="exit"
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="home"
    >
      <HomeComponent />
    </motion.main>
  );
};

export default HomeContainer;
