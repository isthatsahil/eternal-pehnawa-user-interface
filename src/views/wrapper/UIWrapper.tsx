import React, { ReactNode } from "react";
//import CustomCursor from "../../components/customCursor/CustomCursor";
import DotRing from "../../components/customCursor/DotRing";
import Navbar from "../../components/navbar/Navbar";

interface UIWrapperProps {
  children: ReactNode;
}
const UIWrapper = (props: UIWrapperProps) => {
  return (
    <div>
      {/* <CustomCursor /> */}
      <DotRing />
      <Navbar />
      {props.children}
    </div>
  );
};

export default UIWrapper;
