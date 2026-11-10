import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { BookingService } from '../../services/booking.service';
import { TranslationService } from '../../services/translation.service';
import { Booking } from '../../models/booking.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-booking-confirmation',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './booking-confirmation.component.html',
  styleUrl: './booking-confirmation.component.css',
})
export class BookingConfirmationComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  bookingService = inject(BookingService);
  translationService = inject(TranslationService);

  booking: Booking | undefined;
  pnr = '';

  ngOnInit(): void {
    this.pnr = this.route.snapshot.paramMap.get('pnr') || '';
    if (this.pnr) {
      this.booking = this.bookingService.getBookingByPnr(this.pnr);
    }

    if (!this.booking) {
      // If not found in memory, try to pick first user booking or redirect
      const all = this.bookingService.getAllBookings();
      this.booking = all[0];
    }
  }

  printTicket(): void {
    window.print();
  }
}
