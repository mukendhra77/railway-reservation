import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { TranslationService } from '../../services/translation.service';
import { Booking } from '../../models/booking.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pnr-status',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, TranslatePipe],
  templateUrl: './pnr-status.component.html',
  styleUrl: './pnr-status.component.css',
})
export class PNRStatusComponent implements OnInit {
  private bookingService = inject(BookingService);
  private route = inject(ActivatedRoute);
  translationService = inject(TranslationService);

  pnrInput = '';
  searchAttempted = false;
  foundBooking: Booking | null = null;
  samplePnrs: string[] = [];

  ngOnInit(): void {
    // Populate sample PNRs from stored bookings so tester can click and search instantly
    const all = this.bookingService.getAllBookings();
    this.samplePnrs = all.slice(0, 3).map((b) => b.pnr);

    // If queryParam 'pnr' is present, auto-search
    const queryPnr = this.route.snapshot.queryParams['pnr'];
    if (queryPnr) {
      this.pnrInput = queryPnr;
      this.onSearchPnr();
    }
  }

  fillSamplePnr(pnr: string): void {
    this.pnrInput = pnr;
    this.onSearchPnr();
  }

  onSearchPnr(): void {
    const cleanPnr = this.pnrInput.trim().replace(/\D/g, '');
    this.searchAttempted = true;

    if (!cleanPnr || cleanPnr.length < 5) {
      this.foundBooking = null;
      return;
    }

    const booking = this.bookingService.getBookingByPnr(cleanPnr);
    this.foundBooking = booking || null;
  }
}
