import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../../services/train.service';
import { TranslationService } from '../../services/translation.service';
import { Station, PopularDestination, FastCorridor } from '../../models/train.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  trainService = inject(TrainService);
  translationService = inject(TranslationService);

  bookingForm!: FormGroup;
  stations: Station[] = [];
  destinations: PopularDestination[] = [];
  fastCorridors: FastCorridor[] = [];
  sameStationError = false;
  minDate: string = '';

  ngOnInit(): void {
    this.stations = this.trainService.getStations();
    this.destinations = this.trainService.getPopularDestinations();
    this.fastCorridors = this.trainService.getFastCorridors();

    // Default to tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    // Default origin to NDLS and destination to BSB (matching the user's uploaded photo!)
    this.bookingForm = this.fb.group({
      fromStation: ['NDLS', Validators.required],
      toStation: ['BSB', Validators.required],
      journeyDate: [this.minDate, Validators.required],
      travelClass: ['ALL'],
      onlyHighSpeed: [false],
    });
  }

  swapStations(): void {
    const from = this.bookingForm.get('fromStation')?.value;
    const to = this.bookingForm.get('toStation')?.value;
    this.bookingForm.patchValue({
      fromStation: to,
      toStation: from,
    });
    this.checkSameStation();
  }

  checkSameStation(): boolean {
    const from = this.bookingForm.get('fromStation')?.value;
    const to = this.bookingForm.get('toStation')?.value;
    this.sameStationError = Boolean(from && to && from === to);
    return this.sameStationError;
  }

  onSearch(): void {
    if (this.checkSameStation()) {
      return;
    }

    if (this.bookingForm.valid) {
      const val = this.bookingForm.value;
      this.router.navigate(['/trains'], {
        queryParams: {
          from: val.fromStation,
          to: val.toStation,
          date: val.journeyDate,
          class: val.travelClass,
          highSpeed: val.onlyHighSpeed ? 'true' : 'false',
        },
      });
    }
  }

  viewFastRoute(corridor: FastCorridor): void {
    this.router.navigate(['/trains'], {
      queryParams: {
        from: corridor.fromCode,
        to: corridor.toCode,
        date: this.minDate,
        trainId: corridor.trainId,
      },
    });
  }

  bookRoute(dest: PopularDestination): void {
    this.router.navigate(['/trains'], {
      queryParams: {
        from: dest.fromCode,
        to: dest.toCode,
        date: this.minDate,
      },
    });
  }

  scrollContainer(elementId: string, direction: 'left' | 'right'): void {
    const el = document.getElementById(elementId);
    if (el) {
      const scrollAmount = 380;
      el.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }
}
