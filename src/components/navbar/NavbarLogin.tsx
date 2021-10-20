import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import Button from "@mui/material/Button";

const NavbarLogin = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      {isLogin ? (
        <ProfileDropdown handleLogin={setIsLogin} />
      ) : (
        <Button
          size="small"
          sx={{ color: "#191919" }}
          onClick={() => setIsLogin(true)}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default NavbarLogin;
