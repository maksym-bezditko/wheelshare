import { NavLink } from "react-router-dom";
import "./index.css";
import avatar from "./assets/avatar.png";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useCallback } from "react";
import { selectCurrentUser, setIsSidebarVisible } from "../../app/slice";
import { Routes } from "../../models/routes";

type Props = {
  isVisible: boolean;
};

const Sidebar = ({ isVisible }: Props) => {
  const dispatch = useAppDispatch();

  const closeSidebar = useCallback(() => dispatch(setIsSidebarVisible(false)), [dispatch]);

  const currentUser = useAppSelector(selectCurrentUser);

  return (
    <>
      <div className={`sidebar-wrapper ${isVisible && 'sidebar-visible'}`}>
        <NavLink to={Routes.HOME} className="relative-wrapper smaller-logo-relative-wrapper" onClick={closeSidebar}>
          <p className="logo smaller-logo">WHEELSHARE</p>
          <p className="detail smaller-logo-detail">OO</p>
        </NavLink>

        <NavLink to={Routes.PROFILE} className="profile-preview-wrapper" onClick={closeSidebar}>
          <img className="sidebar-avatar" src={avatar} alt="avatar" />
          <p>{currentUser?.firstName + " " + currentUser?.lastName}</p>
        </NavLink>

        <div className="sidebar-links">
          <NavLink to={Routes.CARS} className="sidebar-link" onClick={closeSidebar}>
            See car list
          </NavLink>
          <NavLink to={Routes.MY_CARS} className="sidebar-link" onClick={closeSidebar}>
            My cars
          </NavLink>
          <NavLink to={Routes.BOOKMARKS} className="sidebar-link" onClick={closeSidebar}>
            Bookmarks
          </NavLink>
          <NavLink to={Routes.HOME} className="sidebar-link main-link" onClick={closeSidebar}>
            Main
          </NavLink>
        </div>
      </div>

      {isVisible && (
        <div className="sidebar-carpet" onClick={closeSidebar}></div>
      )}
    </>
  );
};

export default Sidebar;