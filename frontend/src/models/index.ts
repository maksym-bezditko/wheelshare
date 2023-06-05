export enum CarClass {
  SEDAN = 'Sedan',
  SUV = 'Suv',
  HATCHBACK = 'Hatchback',
  SPORTS = 'Sports',
}


export type Car = {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  _class: CarClass;
  location: string;
  costPerHour: number;
};

export type RentedCar = {
  carId: string;
  rentStarted: string;
  rentInHours: number;
}

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  bank: string;
  cardNumber: string;
  cardTerm: string;
  cvv: string;
  rentedCars: RentedCar[];
  bookmarkedCars: string[],
};

export enum CarListContentType {
  Bookmarks = 'bookmarks',
  Available = 'available',
  Rented = 'rented',
}

