import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { NavbarComponent } from '../../Components/navbar/navbar';
import { Footer } from '../../Components/footer/footer';
import { SuccessModal } from '../../Components/success-modal/success-modal';

@Component({
  selector: 'app-done-page',
  standalone: true,
  imports: [CommonModule, NavbarComponent, Footer, SuccessModal],
  templateUrl: './done-page.component.html',
  styleUrl: './done-page.component.css'
})
export class DonePageComponent {
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

  goHome(): void {
    this.contactService.closeModal();
    this.router.navigate(['/']);
  }
}
