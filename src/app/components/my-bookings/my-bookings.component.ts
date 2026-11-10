import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { Booking } from '../../models/booking.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css',
})
export class MyBookingsComponent implements OnInit {
  private bookingService = inject(BookingService);
  private authService = inject(AuthService);
  private router = inject(Router);
  translationService = inject(TranslationService);

  bookings: Booking[] = [];
  selectedBookingToCancel: Booking | null = null;
  cancellationNotice = '';

  ngOnInit(): void {
    this.loadUserBookings();
  }

  loadUserBookings(): void {
    const user = this.authService.getCurrentUser();
    if (!user) {
      this.bookings = [];
      return;
    }

    // Load bookings belonging to user by id or email
    let userBookings = this.bookingService.getUserBookings(user.id);
    if (userBookings.length === 0 && user.email) {
      userBookings = this.bookingService.getUserBookingsByEmail(user.email);
    }

    // If user has no specific bookings yet, show all system bookings for easy academic demo
    if (userBookings.length === 0) {
      userBookings = this.bookingService.getAllBookings();
    }

    this.bookings = userBookings;
  }

  viewTicket(pnr: string): void {
    this.router.navigate(['/confirmation', pnr]);
  }

  openCancelModal(booking: Booking): void {
    this.selectedBookingToCancel = booking;
    this.cancellationNotice = '';
  }

  closeCancelModal(): void {
    this.selectedBookingToCancel = null;
  }

  confirmCancellation(): void {
    if (!this.selectedBookingToCancel) return;

    const result = this.bookingService.cancelBooking(this.selectedBookingToCancel.pnr);
    if (result.success) {
      this.cancellationNotice = result.message;
      this.loadUserBookings();
      setTimeout(() => {
        this.selectedBookingToCancel = null;
        this.cancellationNotice = '';
      }, 1800);
    }
  }
}
