import React, { ReactNode } from "react";

interface UIWrapperProps {
  children: ReactNode;
}
const UIWrapper = (props: UIWrapperProps) => {
  return <div>{props.children}</div>;
};

export default UIWrapper;
