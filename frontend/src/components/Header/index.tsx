import { useCallback } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";

const Header = () => {

  const renderButtons = useCallback(() => {
    return (
      <>
        <NavLink to="/sign-in" className="header-button sign-in-button">Sign in</NavLink>
        <NavLink to="/sign-up" className="header-button sign-up-button">Sign up</NavLink>
      </>
    );
  }, []);

  return (
    <div className="header-wrapper">
      <NavLink to="/" className="relative-wrapper">
        <p className="logo">WHEELSHARE</p>
        <p className="detail">OO</p>
      </NavLink>

      <div className="button-group">
        {renderButtons()}
      </div>
    </div>
  );
};

export default Header;