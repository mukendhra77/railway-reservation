import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainService } from '../../services/train.service';
import { TranslationService } from '../../services/translation.service';
import { Station } from '../../models/train.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-train-search',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './train-search.component.html',
  styleUrl: './train-search.component.css',
})
export class TrainSearchComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  trainService = inject(TrainService);
  translationService = inject(TranslationService);

  searchForm!: FormGroup;
  stations: Station[] = [];
  sameStationError = false;
  minDate = '';

  popularRoutes = [
    { from: 'NDLS', to: 'BSB', label: '⚡ Delhi ⟷ Varanasi (Vande Bharat)' },
    { from: 'SBC', to: 'MAS', label: '⚡ Bengaluru ⟷ Chennai (Vande Bharat)' },
    { from: 'HYB', to: 'VSKP', label: '⚡ Hyderabad ⟷ Vizag (Vande Bharat)' },
    { from: 'CSMT', to: 'ADI', label: '⚡ Mumbai ⟷ Ahmedabad (Vande Bharat)' },
    { from: 'CSMT', to: 'MAO', label: '⚡ Mumbai ⟷ Goa (Vande Bharat & VistaDome)' },
    { from: 'NDLS', to: 'CSMT', label: 'Delhi ⟷ Mumbai Rajdhani' },
  ];

  ngOnInit(): void {
    this.stations = this.trainService.getStations();

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];

    this.searchForm = this.fb.group({
      fromStation: ['NDLS', Validators.required],
      toStation: ['BSB', Validators.required],
      journeyDate: [this.minDate, Validators.required],
      travelClass: ['ALL'],
      onlyHighSpeed: [false],
    });
  }

  swapStations(): void {
    const from = this.searchForm.get('fromStation')?.value;
    const to = this.searchForm.get('toStation')?.value;
    this.searchForm.patchValue({
      fromStation: to,
      toStation: from,
    });
    this.checkSameStation();
  }

  checkSameStation(): boolean {
    const from = this.searchForm.get('fromStation')?.value;
    const to = this.searchForm.get('toStation')?.value;
    this.sameStationError = Boolean(from && to && from === to);
    return this.sameStationError;
  }

  selectQuickRoute(route: { from: string; to: string }): void {
    this.searchForm.patchValue({
      fromStation: route.from,
      toStation: route.to,
    });
    this.checkSameStation();
  }

  onSearch(): void {
    if (this.checkSameStation()) {
      return;
    }

    if (this.searchForm.valid) {
      const val = this.searchForm.value;
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
}
