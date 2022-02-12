import { ReactNode } from "react";
//import CustomCursor from "@components/customCursor/CustomCursor";
import DotRing from "@components/customCursor/DotRing";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import CustomSnackbar from "@components/snackbar/CustomSnackbar";

interface UIWrapperProps {
  children: ReactNode;
}
const UIWrapper = (props: UIWrapperProps) => {
  return (
    <div>
      {/* <CustomCursor /> */}
      <DotRing />
      {/* <Navbar /> */}
      {props.children}
      <Footer />
      <CustomSnackbar />
    </div>
  );
};

export default UIWrapper;
