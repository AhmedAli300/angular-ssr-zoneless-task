import { Injectable, signal, PLATFORM_ID, Inject, Signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Testimonial } from '../models/testimonial.model';
import { ContactFormData } from '../models/contact.model';

const STORAGE_KEY = 'digital_bond_testimonials_v1';

@Injectable({
  providedIn: 'root'
})
export class TestimonialsService {
  /** Reactive state holding all testimonials */
  private readonly testimonialsData: WritableSignal<Testimonial[]>;
  readonly testimonials: Signal<Testimonial[]>;

  /** Current active slide index for the carousel */
  readonly currentIndex: WritableSignal<number>;

  /** View mode: carousel or grid */
  readonly viewMode: WritableSignal<'carousel' | 'grid'>;

  /** Auto-play state */
  readonly isAutoPlayActive: WritableSignal<boolean>;

  /** Indicates a newly added review was just saved */
  readonly newlyAddedId: WritableSignal<number | string | null>;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object
  ) {
    const fallbackTestimonials: Testimonial[] = [
      {
        id: 1,
        clientName: 'Tarek Mansour',
        role: 'Chief Marketing Officer',
        company: 'Nexus Retail Group',
        avatarUrl: 'images/avatars/avatar-1.svg',
        rating: 5,
        review: 'Digital Bond transformed our entire omnichannel marketing presence. Their performance campaigns generated a 320% surge in qualified leads in just 90 days. Exceptional creativity combined with deep analytics and continuous optimization.',
        highlightMetric: '+320% Qualified Leads',
        date: '2026-08-15'
      },
      {
        id: 2,
        clientName: 'Dina El-Shazly',
        role: 'Head of E-Commerce',
        company: 'Moda Lifestyle',
        avatarUrl: 'images/avatars/avatar-2.svg',
        rating: 5,
        review: 'The web development and SEO teams at Digital Bond delivered an ultra-fast platform with instant loading times. Our organic search conversions grew by 180% and the mobile user experience is completely frictionless across all devices.',
        highlightMetric: '+180% Organic Conversions',
        date: '2026-08-28'
      },
      {
        id: 3,
        clientName: 'Karim Fahmy',
        role: 'Founder & CEO',
        company: 'FinTech Horizon',
        avatarUrl: 'images/avatars/avatar-3.svg',
        rating: 5,
        review: 'Their influencer marketing and media production campaigns made our app launch go viral across the MENA region. They consistently go beyond expectations with impeccable execution, rapid communication, and high-impact creative direction.',
        highlightMetric: '1.2M+ App Downloads',
        date: '2026-09-02'
      },
      {
        id: 4,
        clientName: 'Salma Radwan',
        role: 'Director of Growth',
        company: 'Aura Health & Care',
        avatarUrl: 'images/avatars/avatar-4.svg',
        rating: 5,
        review: 'From automated SMS campaigns to social media community management, Digital Bond feels like a true in-house partner. Highly responsive, data-driven, and relentlessly innovative in finding high-converting angles.',
        highlightMetric: '98% Customer Retention',
        date: '2026-09-10'
      },
      {
        id: 5,
        clientName: 'Omar Abdel-Aziz',
        role: 'VP of Technology',
        company: 'SaaS Scale MENA',
        avatarUrl: 'images/avatars/avatar-1.svg',
        rating: 5,
        review: 'Partnering with Digital Bond for our full-stack web and mobile application development exceeded our wildest KPIs. The site speed is blazingly fast with 100/100 Lighthouse performance, driving a massive increase in enterprise conversions.',
        highlightMetric: '99.9% Uptime & 100/100 Speed',
        date: '2026-09-12'
      },
      {
        id: 6,
        clientName: 'Nouran Hegazi',
        role: 'Creative Director',
        company: 'Vanguard Media',
        avatarUrl: 'images/avatars/avatar-2.svg',
        rating: 5,
        review: 'The visual storytelling and video production by Digital Bond set a new industry benchmark for our brand. Our brand recall grew by 240% across Egypt and the Gulf within the first month alone.',
        highlightMetric: '+240% Brand Recall',
        date: '2026-09-16'
      }
    ];

    this.testimonialsData = signal<Testimonial[]>(fallbackTestimonials);
    this.testimonials = this.testimonialsData.asReadonly();
    this.currentIndex = signal<number>(0);
    this.viewMode = signal<'carousel' | 'grid'>('carousel');
    this.isAutoPlayActive = signal<boolean>(true);
    this.newlyAddedId = signal<number | string | null>(null);

    this.loadInitialTestimonials();
  }

  /**
   * Loads testimonials from localStorage or data/testimonials.json
   */
  loadInitialTestimonials(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      const cached = localStorage.getItem(STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.testimonialsData.set(parsed);
        }
      }
    } catch {
      // LocalStorage access fallback
    }

    // Also fetch the canonical JSON file to ensure synchronization
    fetch('data/testimonials.json')
      .then(res => res.json())
      .then((data: Testimonial[]) => {
        if (Array.isArray(data) && data.length > 0) {
          try {
            const cached = localStorage.getItem(STORAGE_KEY);
            if (cached) {
              const parsed: Testimonial[] = JSON.parse(cached);
              const userItems = parsed.filter(item => item.isUserSubmitted);
              const merged = [...userItems, ...data.filter(d => !userItems.some(u => u.id === d.id))];
              this.testimonialsData.set(merged);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
              return;
            }
          } catch {}

          this.testimonialsData.set(data);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
          } catch {}
        }
      })
      .catch(() => {});
  }

  /**
   * Adds a new testimonial from contact form submission
   * Persists immediately to local signal, localStorage, and attempts server write
   */
  addTestimonialFromContact(formData: ContactFormData): Testimonial {
    const avatars: string[] = [
      'images/avatars/avatar-1.svg',
      'images/avatars/avatar-2.svg',
      'images/avatars/avatar-3.svg',
      'images/avatars/avatar-4.svg'
    ];
    const randomAvatar = avatars[Math.floor(Math.random() * avatars.length)];

    const newTestimonial: Testimonial = {
      id: Date.now(),
      clientName: formData.fullName.trim(),
      role: 'Verified Client',
      company: formData.service ? `${formData.service} Client` : 'Digital Bond Partner',
      avatarUrl: randomAvatar,
      rating: 5,
      review: formData.message.trim(),
      highlightMetric: 'Verified Request',
      date: new Date().toISOString().split('T')[0],
      isUserSubmitted: true
    };

    // Prepend to list so it appears immediately at the top/first slide
    this.testimonialsData.update((prev) => [newTestimonial, ...prev]);
    this.currentIndex.set(0);
    this.newlyAddedId.set(newTestimonial.id);

    // Save to LocalStorage immediately
    if (isPlatformBrowser(this.platformId)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.testimonialsData()));
      } catch (err) {
        console.warn('Could not save to localStorage:', err);
      }

      // Also attempt to persist to Node server endpoint
      fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTestimonial)
      }).catch(() => {});
    }

    return newTestimonial;
  }

  /** Navigation Controls */
  nextSlide(): void {
    const total = this.testimonialsData().length;
    if (total === 0) return;
    this.currentIndex.update((idx) => (idx + 1) % total);
  }

  prevSlide(): void {
    const total = this.testimonialsData().length;
    if (total === 0) return;
    this.currentIndex.update((idx) => (idx - 1 + total) % total);
  }

  goToSlide(index: number): void {
    const total = this.testimonialsData().length;
    if (index >= 0 && index < total) {
      this.currentIndex.set(index);
    }
  }

  setViewMode(mode: 'carousel' | 'grid'): void {
    this.viewMode.set(mode);
  }

  toggleViewMode(): void {
    this.viewMode.update(m => m === 'carousel' ? 'grid' : 'carousel');
  }
}
