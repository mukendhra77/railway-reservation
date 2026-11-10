export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  berthPreference: 'Lower' | 'Middle' | 'Upper' | 'Side Lower' | 'Side Upper' | 'Window' | 'No Preference';
  allocatedSeat?: string;
  allocatedCoach?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  userId: string;
  userEmail: string;
  userName: string;
  trainId: string;
  trainNumber: string;
  trainName: string;
  trainType: string;
  fromStationCode: string;
  fromStationName: string;
  toStationCode: string;
  toStationName: string;
  journeyDate: string;
  departureTime: string;
  arrivalTime: string;
  travelClass: 'SL' | '3A' | '2A' | '1A' | 'CC';
  className: string;
  passengers: Passenger[];
  baseFare: number;
  cateringFee: number;
  convenienceFee: number;
  totalFare: number;
  bookingDate: string;
  bookingStatus: 'CONFIRMED' | 'CANCELLED';
  platform?: string;
  cancellationDate?: string;
  refundAmount?: number;
}
