export type CarClass = 'Sports car' | 'Sedan' | 'Compact car' | 'Truck';

export type Car = {
  id: string;
  imageUrl: string;
  brand: string;
  model: string;
  class: CarClass;
  location: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  paymentInfo: {
    bank: string;
    cardNumber: number;
    cardTerm: string;
    cvv: number;
  };
  cars: Car[];
};

