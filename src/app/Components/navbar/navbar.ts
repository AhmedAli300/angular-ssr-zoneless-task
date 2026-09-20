import { Component, signal, WritableSignal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';
import { NavItem } from '../../models/nav-item.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {
  mobileMenuOpen: WritableSignal<boolean>;
  navItems: NavItem[];

  constructor(public scrollService: ScrollService) {
    this.mobileMenuOpen = signal<boolean>(false);
    this.navItems = [
      { label: 'Services', sectionId: 'services' },
      { label: 'Testimonials', sectionId: 'testimonials' },
      { label: 'Contact Us', sectionId: 'contact' }
    ];
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open: boolean) => !open);
  }

  scrollTo(sectionId: string): void {
    this.mobileMenuOpen.set(false);
    this.scrollService.scrollToSection(sectionId);
  }
}
