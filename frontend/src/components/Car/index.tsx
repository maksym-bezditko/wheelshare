import { useCallback, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { Car as CarModel, RentedCar } from "../../models";
import { useAppSelector } from "../../app/hooks";
import { selectCurrentUser, selectTimestamp } from "../../app/slice";

type Props = {
  car: CarModel,
  rentedCarData?: RentedCar;
  isRentedCarsRoute: boolean;
};

const Car = ({ car, rentedCarData, isRentedCarsRoute }: Props) => {
  const { brand, costPerHour, imageUrl, location, model, _class, id } = car;

  const user = useAppSelector(selectCurrentUser);

  const bookmarkedCars = user?.bookmarkedCars || [];

  const timestamp = useAppSelector(selectTimestamp);

  const { toggleBookmark, toggleRentedCar } = useRequest();

  const timeLeft = +((new Date(rentedCarData?.rentStarted ?? 0).getTime() + (rentedCarData?.rentInHours ?? 0) * 60 * 60 * 1000  - timestamp) / (1000 * 60)).toFixed(0);

  const handleBookmarkClick = useCallback(() => {
    toggleBookmark(user?._id!, id);
  }, [id, toggleBookmark, user?._id]);

  const handleToggleCar = useCallback(() => {
    toggleRentedCar(user?._id!, {
      carId: id,
      rentInHours: 2,
      rentStarted: new Date().toISOString(),
    });
  }, [id, toggleRentedCar, user?._id]);

  useEffect(() => {
    if (timeLeft === 0) {
      toggleRentedCar(user?._id!, {
        carId: id,
        rentInHours: 2,
        rentStarted: new Date().toISOString(),
      })
    }
  }, [id, timeLeft, toggleRentedCar, user?._id]);

  return (
    <div style={{
      width: 1146,
      height: 170,
      backgroundColor: '#D9D9D9',
      borderRadius: 30,
      overflow: 'hidden',
      display: 'flex',
      justifyContent: 'space-between',
      position: 'relative',
      marginTop: 20,
    }}>
      <div style={{
        display: 'grid',
        placeItems: 'center',
        width: 250,
        height: '100%',
        backgroundColor: '#676767',
        borderRadius: 30,
      }}><img src={imageUrl} alt={`${brand} ${model}`} style={{ objectFit: 'cover', width: '100%', height: '100%' }} /></div>
      <div style={{
        flexGrow: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingBottom: 30,
        marginLeft: 30,
      }}>
        <p style={{color: 'black'}}>Brend: {brand}</p>
        <p style={{color: 'black'}}>Model: {model}</p>
        <p style={{color: 'black'}}>Class: {_class}</p>
        <p style={{color: 'black'}}>Location: {location}</p>
      </div>
      <div style={{
        display: 'grid',
        height: '100%',
        width: 250,
        placeItems: 'center',
      }}>
        <p style={{color: 'black'}}>${costPerHour} per hour</p>
      </div>
      <div style={{
        display: 'grid',
        height: '100%',
        width: 250,
        placeItems: 'center',
      }}>
        <button onClick={handleToggleCar} className={`description-button go-button`}>{rentedCarData ? 'Give the car away!' : 'Rent the car!'}</button>
      </div>

      <div onClick={handleBookmarkClick} className={`bookmark ${bookmarkedCars.includes(id) ? 'isBookmarkActive' : ''}`}></div>

      {rentedCarData && isRentedCarsRoute && (
        <div style={{
          position: 'absolute',
          right: 15,
          bottom: 15,
        }}>
          <p style={{color: 'black', fontSize: 12 }}>
            Time left in minutes: {timeLeft}
          </p>
        </div>
      )}
    </div>
  );
};

export default Car;