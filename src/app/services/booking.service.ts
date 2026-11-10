import { Injectable } from '@angular/core';
import { Booking, Passenger } from '../models/booking.model';
import { Train } from '../models/train.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private readonly BOOKINGS_KEY = 'railway_bookings';

  constructor() {
    this.seedDemoBookings();
  }

  private seedDemoBookings(): void {
    const existing = localStorage.getItem(this.BOOKINGS_KEY);
    if (!existing) {
      const demoBookings: Booking[] = [
        {
          id: 'bk_demo_101',
          pnr: '4829104821',
          userId: 'usr_demo_1',
          userEmail: 'student@university.edu',
          userName: 'Aarav Sharma',
          trainId: 'trn_12952',
          trainNumber: '12952',
          trainName: 'Rajdhani Overland Express',
          trainType: 'Premier Superfast',
          fromStationCode: 'NDLS',
          fromStationName: 'New Delhi',
          toStationCode: 'CSMT',
          toStationName: 'Mumbai CSMT',
          journeyDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
          departureTime: '16:55',
          arrivalTime: '08:35',
          travelClass: '2A',
          className: 'AC 2 Tier',
          passengers: [
            {
              name: 'Aarav Sharma',
              age: 21,
              gender: 'Male',
              berthPreference: 'Lower',
              allocatedCoach: 'A1',
              allocatedSeat: '18 (Lower Berth)',
            },
            {
              name: 'Rohan Verma',
              age: 22,
              gender: 'Male',
              berthPreference: 'Upper',
              allocatedCoach: 'A1',
              allocatedSeat: '19 (Upper Berth)',
            },
          ],
          baseFare: 5960,
          cateringFee: 600,
          convenienceFee: 70,
          totalFare: 6630,
          bookingDate: new Date().toISOString(),
          bookingStatus: 'CONFIRMED',
          platform: 'Platform 3',
        },
        {
          id: 'bk_demo_102',
          pnr: '8392104712',
          userId: 'usr_demo_1',
          userEmail: 'student@university.edu',
          userName: 'Aarav Sharma',
          trainId: 'trn_12051',
          trainNumber: '12051',
          trainName: 'Konkan Sea Breeze VistaDome',
          trainType: 'Scenic VistaDome Express',
          fromStationCode: 'CSMT',
          fromStationName: 'Mumbai CSMT',
          toStationCode: 'MAO',
          toStationName: 'Madgaon Goa',
          journeyDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
          departureTime: '05:10',
          arrivalTime: '14:10',
          travelClass: '2A',
          className: 'VistaDome Lounge',
          passengers: [
            {
              name: 'Aarav Sharma',
              age: 21,
              gender: 'Male',
              berthPreference: 'Window',
              allocatedCoach: 'V1',
              allocatedSeat: '07 (Window Observation)',
            },
          ],
          baseFare: 2450,
          cateringFee: 250,
          convenienceFee: 40,
          totalFare: 2740,
          bookingDate: new Date(Date.now() - 86400000 * 2).toISOString(),
          bookingStatus: 'CONFIRMED',
          platform: 'Platform 1',
        },
      ];
      localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(demoBookings));
    }
  }

  getAllBookings(): Booking[] {
    try {
      const raw = localStorage.getItem(this.BOOKINGS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  getBookingByPnr(pnr: string): Booking | undefined {
    const cleanPnr = pnr.replace(/\D/g, '').trim();
    return this.getAllBookings().find((b) => b.pnr.replace(/\D/g, '') === cleanPnr);
  }

  getUserBookings(userId: string): Booking[] {
    return this.getAllBookings().filter((b) => b.userId === userId);
  }

  getUserBookingsByEmail(email: string): Booking[] {
    const norm = email.trim().toLowerCase();
    return this.getAllBookings().filter((b) => b.userEmail.toLowerCase() === norm);
  }

  generatePnr(): string {
    // Generate authentic 10-digit Indian Railway style PNR
    const prefix = Math.floor(200 + Math.random() * 700).toString(); // e.g. 482
    const suffix = Math.floor(1000000 + Math.random() * 9000000).toString(); // 7 digits
    return `${prefix}${suffix}`;
  }

  createBooking(params: {
    train: Train;
    travelClass: 'SL' | '3A' | '2A' | '1A' | 'CC';
    journeyDate: string;
    passengers: Passenger[];
    currentUser: User;
    includeCatering: boolean;
  }): Booking {
    const bookings = this.getAllBookings();
    const pnr = this.generatePnr();
    const classObj = params.train.classes.find((c) => c.type === params.travelClass) || params.train.classes[0];

    // Assign realistic coach & seat numbers
    const coachPrefix =
      params.travelClass === '1A'
        ? 'H1'
        : params.travelClass === '2A'
        ? 'A' + Math.floor(1 + Math.random() * 2)
        : params.travelClass === '3A'
        ? 'B' + Math.floor(1 + Math.random() * 4)
        : params.travelClass === 'CC'
        ? 'C' + Math.floor(1 + Math.random() * 3)
        : 'S' + Math.floor(1 + Math.random() * 6);

    const startSeat = Math.floor(10 + Math.random() * 40);

    const allocatedPassengers: Passenger[] = params.passengers.map((p, idx) => {
      const seatNum = startSeat + idx;
      const berthTypes = ['Lower Berth', 'Middle Berth', 'Upper Berth', 'Side Lower', 'Side Upper'];
      const assignedBerth =
        p.berthPreference !== 'No Preference'
          ? p.berthPreference
          : berthTypes[Math.floor(Math.random() * berthTypes.length)];

      return {
        ...p,
        allocatedCoach: coachPrefix,
        allocatedSeat: `${seatNum} (${assignedBerth})`,
      };
    });

    const baseFare = classObj.fare * params.passengers.length;
    const cateringFee = params.includeCatering ? 250 * params.passengers.length : 0;
    const convenienceFee = 35;
    const totalFare = baseFare + cateringFee + convenienceFee;

    const newBooking: Booking = {
      id: 'bk_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      pnr,
      userId: params.currentUser.id,
      userEmail: params.currentUser.email,
      userName: params.currentUser.name,
      trainId: params.train.id,
      trainNumber: params.train.trainNumber,
      trainName: params.train.trainName,
      trainType: params.train.trainType,
      fromStationCode: params.train.fromStationCode,
      fromStationName: params.train.fromStationName,
      toStationCode: params.train.toStationCode,
      toStationName: params.train.toStationName,
      journeyDate: params.journeyDate,
      departureTime: params.train.departureTime,
      arrivalTime: params.train.arrivalTime,
      travelClass: params.travelClass,
      className: classObj.name,
      passengers: allocatedPassengers,
      baseFare,
      cateringFee,
      convenienceFee,
      totalFare,
      bookingDate: new Date().toISOString(),
      bookingStatus: 'CONFIRMED',
      platform: 'Platform ' + Math.floor(1 + Math.random() * 5),
    };

    bookings.unshift(newBooking);
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));

    return newBooking;
  }

  cancelBooking(pnr: string): { success: boolean; message: string; refundAmount?: number } {
    const bookings = this.getAllBookings();
    const cleanPnr = pnr.replace(/\D/g, '').trim();
    const index = bookings.findIndex((b) => b.pnr.replace(/\D/g, '') === cleanPnr);

    if (index === -1) {
      return { success: false, message: 'Ticket booking record not found.' };
    }

    const booking = bookings[index];
    if (booking.bookingStatus === 'CANCELLED') {
      return { success: false, message: 'This ticket has already been cancelled.' };
    }

    // 80% refund calculation (nominal 20% cancellation deduction)
    const refundAmount = Math.round(booking.totalFare * 0.8);
    booking.bookingStatus = 'CANCELLED';
    booking.cancellationDate = new Date().toISOString();
    booking.refundAmount = refundAmount;

    bookings[index] = booking;
    localStorage.setItem(this.BOOKINGS_KEY, JSON.stringify(bookings));

    return {
      success: true,
      message: `Ticket successfully cancelled. ₹${refundAmount} will be refunded within 3-5 business days.`,
      refundAmount,
    };
  }
}
