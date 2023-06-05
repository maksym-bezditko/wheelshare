import "./index.css";
import Header from "../../components/Header";
import Car from "../../components/Car";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Routes } from "../../models/routes";
import { useAppSelector } from "../../app/hooks";
import { selectAllCars, selectCurrentUser, selectTimestamp, selectUnavailableCarsIds } from "../../app/slice";

const CarList = () => {
  const location = useLocation();

  const cars = useAppSelector(selectAllCars);

  const user = useAppSelector(selectCurrentUser);

  const unavailableCars = useAppSelector(selectUnavailableCarsIds);

  const currentTimestamp = useAppSelector(selectTimestamp);

  const pageTitle = useMemo(() => {
    if (location.pathname === Routes.CARS) {
      return 'The list of available cars';
    } else if (location.pathname === Routes.MY_CARS) {
      return 'The list of cars you rented';
    } else {
      return 'The list of cars you bookmarked'
    }
  }, [location.pathname]);

  const noCarsFallback = useMemo(() => {
    if (location.pathname === Routes.CARS) {
      return 'Sorry, no available cars for now';
    } else if (location.pathname === Routes.MY_CARS) {
      return 'No car is currently rented';
    } else {
      return 'No bookmarked cars'
    }
  }, [location.pathname]);

  const relevantCarList = useMemo(() => {
    if (location.pathname === Routes.CARS) {
      return cars?.filter(car => !unavailableCars.includes(car.id));
    } else if (location.pathname === Routes.MY_CARS) {
      const filteredRentedCars = user?.rentedCars.filter(car => new Date(car.rentStarted).getTime() + car.rentInHours * 60 * 60 * 1000 >= currentTimestamp);

      const rentedCarsIds = filteredRentedCars?.map(item => item.carId);

      const rentedCars = cars?.filter(item => rentedCarsIds?.includes(item.id));

      return rentedCars;
    }

    return cars?.filter(item => user?.bookmarkedCars.includes(item.id));
  }, [cars, currentTimestamp, location.pathname, unavailableCars, user?.bookmarkedCars, user?.rentedCars]);

  return (
    <>
      <Header />
      <main className="description-wrapper" style={{ paddingTop: 81, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {relevantCarList && relevantCarList.length > 0 && (
          <h1
            style={{
              color: "#ddd",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              marginBottom: 80,
            }}
          >
            {pageTitle}
          </h1>
        )}

        {relevantCarList && relevantCarList.length > 0 ? (
          <div>
            {relevantCarList.map(car => <Car isRentedCarsRoute={location.pathname === Routes.MY_CARS} rentedCarData={user?.rentedCars.find(rentedCar => rentedCar.carId === car.id) || undefined} key={car.id} car={car} />)}
          </div>
        ) : (
          <p style={{ color: "#ddd", fontSize: 20 }}>{noCarsFallback}</p>
        )}
      </main>
    </>
  );
};

export default CarList;
