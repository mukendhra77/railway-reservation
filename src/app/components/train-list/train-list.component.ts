import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { TrainService } from '../../services/train.service';
import { TranslationService } from '../../services/translation.service';
import { Train, TrainClass } from '../../models/train.model';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-train-list',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './train-list.component.html',
  styleUrl: './train-list.component.css',
})
export class TrainListComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  trainService = inject(TrainService);
  translationService = inject(TranslationService);

  fromCode = 'NDLS';
  toCode = 'BSB';
  journeyDate = '';
  selectedClassFilter = 'ALL';
  selectedTimeFilter = 'ALL';
  onlyHighSpeedFilter = false;

  trains: Train[] = [];
  filteredTrains: Train[] = [];
  selectedClassMap: Record<string, string> = {}; // trainId -> selected class type (e.g. 'CC')

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.fromCode = params['from'] || 'NDLS';
      this.toCode = params['to'] || 'BSB';
      this.journeyDate = params['date'] || new Date().toISOString().split('T')[0];
      this.selectedClassFilter = params['class'] || 'ALL';
      this.onlyHighSpeedFilter = params['highSpeed'] === 'true';

      this.loadTrains();
    });
  }

  loadTrains(): void {
    this.trains = this.trainService.searchTrains(
      this.fromCode,
      this.toCode,
      this.journeyDate,
      this.selectedClassFilter,
      this.onlyHighSpeedFilter
    );

    // Initialize default selected class for each train
    this.trains.forEach((t) => {
      const preferred =
        this.selectedClassFilter !== 'ALL' && t.classes.some((c) => c.type === this.selectedClassFilter)
          ? this.selectedClassFilter
          : t.classes[0].type;
      this.selectedClassMap[t.id] = preferred;
    });

    this.applyFilters();
  }

  toggleHighSpeedFilter(): void {
    this.onlyHighSpeedFilter = !this.onlyHighSpeedFilter;
    this.applyFilters();
  }

  selectClass(trainId: string, classType: string): void {
    this.selectedClassMap[trainId] = classType;
  }

  getSelectedClass(train: Train): TrainClass {
    const selectedType = this.selectedClassMap[train.id] || train.classes[0].type;
    return train.classes.find((c) => c.type === selectedType) || train.classes[0];
  }

  setTimeFilter(filter: 'ALL' | 'MORNING' | 'AFTERNOON' | 'EVENING'): void {
    this.selectedTimeFilter = filter;
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredTrains = this.trains.filter((t) => {
      // High-speed filter
      if (this.onlyHighSpeedFilter && !t.isHighSpeed) {
        return false;
      }

      // Time filter
      if (this.selectedTimeFilter === 'ALL') return true;
      const hour = parseInt(t.departureTime.split(':')[0], 10);
      if (this.selectedTimeFilter === 'MORNING') return hour >= 6 && hour < 12;
      if (this.selectedTimeFilter === 'AFTERNOON') return hour >= 12 && hour < 18;
      if (this.selectedTimeFilter === 'EVENING') return hour >= 18 || hour < 6;
      return true;
    });
  }

  bookTrain(train: Train): void {
    const chosenClass = this.selectedClassMap[train.id] || train.classes[0].type;
    this.router.navigate(['/book', train.id], {
      queryParams: {
        date: this.journeyDate,
        class: chosenClass,
      },
    });
  }
}
