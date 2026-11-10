export interface Station {
  code: string;
  name: string;
  city: string;
  state: string;
  nameTe?: string;
  nameHi?: string;
}

export interface TrainClass {
  type: 'SL' | '3A' | '2A' | '1A' | 'CC';
  name: string;
  fare: number;
  availableSeats: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  features: string[];
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  trainType: string;
  fromStationCode: string;
  fromStationName: string;
  toStationCode: string;
  toStationName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  distanceKm: number;
  runsOnDays: string[];
  classes: TrainClass[];
  highlight?: string;
  isHighSpeed?: boolean;
  speedBadge?: string; // 'VANDE BHARAT' | 'SUPERFAST EXPRESS' | 'RAJDHANI'
}

export interface FastCorridor {
  id: string;
  badge: string; // 'VANDE BHARAT' | 'SUPERFAST EXPRESS' | 'RAJDHANI'
  trainNumber: string; // e.g. '#22436'
  trainName: string; // 'Vande Bharat Express'
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  duration: string;
  feature: string;
  startingFare: number;
  trainId: string;
  isHighSpeed: boolean;
}

export interface PopularDestination {
  id: string;
  title: string;
  subtitle: string;
  route: string;
  fromCode: string;
  toCode: string;
  startingFare: number;
  duration: string;
  image: string;
  description: string;
  tag: string;
}
