import React, { ReactNode } from "react";
import Navbar from "../../components/navbar/Navbar";

interface UIWrapperProps {
  children: ReactNode;
}
const UIWrapper = (props: UIWrapperProps) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  );
};

export default UIWrapper;
