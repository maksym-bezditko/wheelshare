import "./App.css";
import { signedInRoutes, signedOutRoutes } from "./models/routes";
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Sidebar from "./features/Sidebar";
import { selectCurrentUser, selectIsSidebarVisible, selectIsSignedIn, setIsSidebarVisible, setTimestamp } from "./app/slice";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { useCallback, useEffect, useState } from "react";
import { Routes as AppRoutes } from "./models/routes";
import { useRequest } from "./hooks/useRequest";

const ROUTES_WITH_TRIANGE = [
  AppRoutes.PROFILE,
  AppRoutes.CARS,
  AppRoutes.MY_CARS,
  AppRoutes.BOOKMARKS,
];

const App = () => {
  const dispatch = useAppDispatch();

  const isSidebarVisible = useAppSelector(selectIsSidebarVisible);

  const [isDataRefreshed, setIsDataRefreshed] = useState(false);

  const location = useLocation();

  const user = useAppSelector(selectCurrentUser);

  const currentPathname = location.pathname;

  const shouldShowTriangle = ROUTES_WITH_TRIANGE.includes(currentPathname as AppRoutes);

  const showSidebar = useCallback(() => dispatch(setIsSidebarVisible(true)), [dispatch]);

  const { getAllCars, refreshRentedCars, refreshUserData } = useRequest();

  const isSignedIn = useAppSelector(selectIsSignedIn);

  useEffect(() => {
    if (isSignedIn && !isDataRefreshed) {
      getAllCars();
      refreshRentedCars(user?._id || '');
      refreshUserData(user?._id || '');

      setIsDataRefreshed(true);
    }
  }, [getAllCars, isDataRefreshed, isSignedIn, refreshRentedCars, refreshUserData, user]);

  useEffect(() => {
    const interval = setInterval(() => dispatch(setTimestamp(new Date().getTime())), 1000);

    return () => clearInterval(interval);
  });

  return (
    <div className="app-wrapper">
        <Routes>
          {isSignedIn ? (
            signedInRoutes.map((item) => (
              <Route key={item.path} path={item.path} element={item.component }/>
            ))
          ) : (
            signedOutRoutes.map((item) => (
              <Route key={item.path} path={item.path} element={item.component }/>
            ))
          )}

          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>

        <Sidebar isVisible={isSidebarVisible} />

        {shouldShowTriangle && (
          <div className="triangle" onClick={showSidebar}></div>
        )}
      </div>
  );
}

export default App;
