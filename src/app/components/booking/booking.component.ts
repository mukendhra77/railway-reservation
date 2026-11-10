import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TrainService } from '../../services/train.service';
import { BookingService } from '../../services/booking.service';
import { AuthService } from '../../services/auth.service';
import { TranslationService } from '../../services/translation.service';
import { Train, TrainClass } from '../../models/train.model';
import { Passenger } from '../../models/booking.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css',
})
export class BookingComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  trainService = inject(TrainService);
  bookingService = inject(BookingService);
  authService = inject(AuthService);
  translationService = inject(TranslationService);

  train!: Train;
  trainId = '';
  journeyDate = '';
  selectedClass: 'SL' | '3A' | '2A' | '1A' | 'CC' = '3A';
  includeCatering = true;

  bookingForm!: FormGroup;

  ngOnInit(): void {
    this.trainId = this.route.snapshot.paramMap.get('trainId') || 'trn_12952';
    const queryParams = this.route.snapshot.queryParams;
    this.journeyDate = queryParams['date'] || new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0];
    this.selectedClass = (queryParams['class'] as any) || '3A';

    const foundTrain = this.trainService.getTrainById(this.trainId);
    if (!foundTrain) {
      this.router.navigate(['/search']);
      return;
    }
    this.train = foundTrain;

    // Verify selected class exists on train, else pick first
    if (!this.train.classes.some((c) => c.type === this.selectedClass)) {
      this.selectedClass = this.train.classes[0].type;
    }

    this.initForm();
  }

  private initForm(): void {
    const currentUser = this.authService.getCurrentUser();
    this.bookingForm = this.fb.group({
      passengers: this.fb.array([this.createPassengerGroup(currentUser?.name || '')]),
      includeCatering: [true],
    });
  }

  get passengersArray(): FormArray {
    return this.bookingForm.get('passengers') as FormArray;
  }

  createPassengerGroup(defaultName = ''): FormGroup {
    return this.fb.group({
      name: [defaultName, [Validators.required, Validators.minLength(3)]],
      age: [25, [Validators.required, Validators.min(1), Validators.max(120)]],
      gender: ['Male', Validators.required],
      berthPreference: ['No Preference', Validators.required],
    });
  }

  addPassenger(): void {
    if (this.passengersArray.length < 4) {
      this.passengersArray.push(this.createPassengerGroup());
    }
  }

  removePassenger(index: number): void {
    if (this.passengersArray.length > 1) {
      this.passengersArray.removeAt(index);
    }
  }

  getSelectedClassObj(): TrainClass {
    return this.train.classes.find((c) => c.type === this.selectedClass) || this.train.classes[0];
  }

  changeClass(newClass: 'SL' | '3A' | '2A' | '1A' | 'CC'): void {
    this.selectedClass = newClass;
  }

  toggleCatering(): void {
    this.includeCatering = !this.includeCatering;
    this.bookingForm.patchValue({ includeCatering: this.includeCatering });
  }

  get baseFareTotal(): number {
    return this.getSelectedClassObj().fare * this.passengersArray.length;
  }

  get cateringTotal(): number {
    return this.includeCatering ? 250 * this.passengersArray.length : 0;
  }

  get convenienceFee(): number {
    return 35;
  }

  get grandTotal(): number {
    return this.baseFareTotal + this.cateringTotal + this.convenienceFee;
  }

  onConfirmBooking(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
      return;
    }

    const passengerValues: Passenger[] = this.passengersArray.value;

    const newBooking = this.bookingService.createBooking({
      train: this.train,
      travelClass: this.selectedClass,
      journeyDate: this.journeyDate,
      passengers: passengerValues,
      currentUser,
      includeCatering: this.includeCatering,
    });

    // Navigate to digital ticket confirmation screen
    this.router.navigate(['/confirmation', newBooking.pnr]);
  }
}
