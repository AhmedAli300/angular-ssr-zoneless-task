import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success-modal.html',
  styleUrl: './success-modal.css'
})
export class SuccessModal {
  constructor(
    public readonly contactService: ContactService,
    private readonly router: Router
  ) {}

  viewInTestimonials(): void {
    this.contactService.closeModal();
    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        const el = document.getElementById('testimonials');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 200);
    });
  }

  closeModal(): void {
    this.contactService.closeModal();
    this.router.navigate(['/']);
  }
}
