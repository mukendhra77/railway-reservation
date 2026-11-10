import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TrainSearchComponent } from './components/train-search/train-search.component';
import { TrainListComponent } from './components/train-list/train-list.component';
import { BookingComponent } from './components/booking/booking.component';
import { BookingConfirmationComponent } from './components/booking-confirmation/booking-confirmation.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { PNRStatusComponent } from './components/pnr-status/pnr-status.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: TrainSearchComponent },
  { path: 'trains', component: TrainListComponent },
  {
    path: 'book/:trainId',
    component: BookingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'confirmation/:pnr',
    component: BookingConfirmationComponent,
    canActivate: [authGuard],
  },
  {
    path: 'my-bookings',
    component: MyBookingsComponent,
    canActivate: [authGuard],
  },
  { path: 'pnr-status', component: PNRStatusComponent },
  { path: '**', redirectTo: '' },
];
