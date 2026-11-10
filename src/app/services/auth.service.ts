import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly USERS_KEY = 'railway_users';
  private readonly CURRENT_USER_KEY = 'railway_current_user';

  readonly currentUser = signal<User | null>(null);

  constructor(private router: Router) {
    this.seedDemoUsers();
    this.loadCurrentUser();
  }

  private seedDemoUsers(): void {
    const existing = localStorage.getItem(this.USERS_KEY);
    if (!existing) {
      const demoUsers: User[] = [
        {
          id: 'usr_demo_1',
          name: 'Aarav Sharma',
          email: 'student@university.edu',
          phone: '9876543210',
          password: 'Password@123',
          registeredAt: new Date().toISOString(),
        },
        {
          id: 'usr_demo_2',
          name: 'Priya Patel',
          email: 'priya@traveljournal.in',
          phone: '9123456780',
          password: 'Password@123',
          registeredAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem(this.USERS_KEY, JSON.stringify(demoUsers));
    }
  }

  private loadCurrentUser(): void {
    try {
      const saved = localStorage.getItem(this.CURRENT_USER_KEY);
      if (saved) {
        this.currentUser.set(JSON.parse(saved));
      }
    } catch {
      this.currentUser.set(null);
    }
  }

  getUsers(): User[] {
    try {
      const raw = localStorage.getItem(this.USERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }

  register(userData: { name: string; email: string; phone: string; password?: string }): { success: boolean; message?: string; user?: User } {
    const users = this.getUsers();
    const normalizedEmail = userData.email.trim().toLowerCase();

    if (users.some((u) => u.email.toLowerCase() === normalizedEmail)) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    const newUser: User = {
      id: 'usr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      name: userData.name.trim(),
      email: normalizedEmail,
      phone: userData.phone.trim(),
      password: userData.password,
      registeredAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    // Automatically log in the newly registered user
    this.setCurrentUser(newUser);

    return { success: true, user: newUser };
  }

  login(email: string, password?: string): { success: boolean; message?: string; user?: User } {
    const users = this.getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

    if (!user) {
      return { success: false, message: 'No registered traveler account found with this email.' };
    }

    if (password && user.password && user.password !== password) {
      return { success: false, message: 'Incorrect password entered. Please try again.' };
    }

    this.setCurrentUser(user);
    return { success: true, user };
  }

  private setCurrentUser(user: User): void {
    const safeUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      registeredAt: user.registeredAt,
    };
    this.currentUser.set(safeUser);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(safeUser));
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }
}
