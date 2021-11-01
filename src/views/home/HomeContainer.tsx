import React from "react";
import { HomeComponent } from "./HomeComponent";
import { motion } from "framer-motion";

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
    >
      <HomeComponent />
    </motion.main>
  );
};

export default HomeContainer;
