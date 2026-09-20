import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { CompanyServicesService } from '../../services/company-services.service';
import { ServiceItem } from '../../models/service.model';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  contactForm: FormGroup;
  services: Signal<ServiceItem[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public contactService: ContactService,
    private companyServices: CompanyServicesService
  ) {
    this.services = this.companyServices.services;

    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[+]?[0-9\s\-]{8,18}$/)]],
      service: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  async onSubmit(): Promise<void> {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    try {
      await this.contactService.submitContact(this.contactForm.value);
      
      // Update router URL to /done without full page reload
      await this.router.navigate(['/done']);
    } catch (err) {
      console.error('Submission failed', err);
    }
  }
}
