import { Injectable, signal, PLATFORM_ID, Inject, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ContactFormData, SubmittedContact } from '../models/contact.model';
import { TestimonialsService } from './testimonials.service';

const SUBMISSIONS_STORAGE_KEY = 'digital_bond_last_submission';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  /** Signal holding the most recent submission data */
  readonly submittedData: WritableSignal<SubmittedContact | null>;

  /** Signal controlling visibility of the success pop-up modal */
  readonly isModalOpen: WritableSignal<boolean>;

  /** Signal indicating active submission in flight */
  readonly isSubmitting: WritableSignal<boolean>;

  constructor(
    private readonly testimonialsService: TestimonialsService,
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    this.submittedData = signal<SubmittedContact | null>(null);
    this.isModalOpen = signal<boolean>(false);
    this.isSubmitting = signal<boolean>(false);

    this.restoreLastSubmission();
  }

  private restoreLastSubmission(): void {
    if (isPlatformBrowser(this.platformId)) {
      try {
        const saved = localStorage.getItem(SUBMISSIONS_STORAGE_KEY);
        if (saved) {
          this.submittedData.set(JSON.parse(saved));
        }
      } catch {}
    }
  }

  /**
   * Processes form submission:
   * 1. Creates a structured record with ID and timestamp
   * 2. Saves to localStorage
   * 3. Adds directly to Testimonials so it appears immediately on the site!
   * 4. Updates signals for Modal & /done page
   */
  async submitContact(formData: ContactFormData): Promise<SubmittedContact> {
    this.isSubmitting.set(true);

    // Realistic fast UX delay
    await new Promise((resolve) => setTimeout(resolve, 150));

    const submission: SubmittedContact = {
      ...formData,
      id: 'DB-' + Math.floor(100000 + Math.random() * 900000),
      submittedAt: new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      })
    };

    this.submittedData.set(submission);
    this.isSubmitting.set(false);
    this.isModalOpen.set(true);

    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(SUBMISSIONS_STORAGE_KEY, JSON.stringify(submission));
      } catch {}

      // Optional backend record
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).catch(() => {});
    }

    // IMMEDIATELY publish this user's message as a testimonial review!
    this.testimonialsService.addTestimonialFromContact(formData);

    return submission;
  }

  /** Close the success modal */
  closeModal(): void {
    this.isModalOpen.set(false);
  }

  /** Reset submission state */
  resetSubmission(): void {
    this.submittedData.set(null);
    this.isModalOpen.set(false);
    this.isSubmitting.set(false);
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.removeItem(SUBMISSIONS_STORAGE_KEY);
      } catch {}
    }
  }
}
