import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationService, SupportedLang } from '../../services/translation.service';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  authService = inject(AuthService);
  translationService = inject(TranslationService);

  readonly isMobileMenuOpen = signal(false);
  readonly isLangDropdownOpen = signal(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((v) => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }

  toggleLangDropdown(): void {
    this.isLangDropdownOpen.update((v) => !v);
  }

  selectLanguage(lang: SupportedLang): void {
    this.translationService.setLanguage(lang);
    this.isLangDropdownOpen.set(false);
  }

  onLogout(): void {
    this.authService.logout();
    this.closeMobileMenu();
  }
}
