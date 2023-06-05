import { useCallback } from "react";
import "./index.css";
import { NavLink } from "react-router-dom";
import { Routes } from "../../models/routes";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logout, selectIsSignedIn } from "../../app/slice";

const Header = () => {
  const dispatch = useAppDispatch();

  const isSignedIn = useAppSelector(selectIsSignedIn);

  const handleSignOut = useCallback(() => {
    dispatch(logout())
  }, [dispatch]);

  const renderButtons = useCallback(() => {
    if (isSignedIn) {
      return (
        <>
          <NavLink to={Routes.HOME} className="header-button sign-in-button" onClick={handleSignOut}>Sign out</NavLink>
        </>
      );
    }

    return (
      <>
        <NavLink to={Routes.SIGN_IN} className="header-button sign-in-button">Sign in</NavLink>
        <NavLink to={Routes.SIGN_UP} className="header-button sign-up-button">Sign up</NavLink>
      </>
    );
  }, [handleSignOut, isSignedIn]);

  return (
    <div className="header-wrapper">
      <NavLink to={Routes.HOME} className="relative-wrapper">
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