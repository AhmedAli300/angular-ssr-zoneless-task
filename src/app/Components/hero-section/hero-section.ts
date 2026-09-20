import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroSection {
  constructor(private readonly scrollService: ScrollService) {}

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
