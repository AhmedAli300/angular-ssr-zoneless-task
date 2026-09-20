import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollService } from '../../services/scroll.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {
  currentYear: number;

  constructor(private scrollService: ScrollService) {
    this.currentYear = new Date().getFullYear();
  }

  scrollTo(sectionId: string): void {
    this.scrollService.scrollToSection(sectionId);
  }
}
