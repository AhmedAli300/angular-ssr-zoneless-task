import {
  Component,
  signal,
  computed,
  PLATFORM_ID,
  Inject,
  OnDestroy,
  OnInit,
  Signal,
  WritableSignal
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { TestimonialsService } from '../../services/testimonials.service';
import { Testimonial } from '../../models/testimonial.model';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './testimonials.html',
  styleUrl: './testimonials.css'
})
export class Testimonials implements OnInit, OnDestroy {
   testimonials: Signal<Testimonial[]>;
   currentIndex: Signal<number>;
   viewMode: Signal<'carousel' | 'grid'>;
   isAutoPlayActive: WritableSignal<boolean>;
   totalSlides: Signal<number>;
   currentTestimonial: Signal<Testimonial | undefined>;

   autoPlayTimer: ReturnType<typeof setInterval> | null = null;
   touchStartX = 0;
   touchEndX = 0;
   isDragging = false;

  constructor(
    public testimonialsService: TestimonialsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.testimonials = this.testimonialsService.testimonials;
    this.currentIndex = this.testimonialsService.currentIndex;
    this.viewMode = this.testimonialsService.viewMode;
    this.isAutoPlayActive = signal<boolean>(true);
    
    this.totalSlides = computed<number>(() => this.testimonials().length);
    
    this.currentTestimonial = computed<Testimonial | undefined>(() => {
      const list = this.testimonials();
      const idx = this.currentIndex();
      return list[idx] || list[0];
  });
}

ngOnInit(): void {
  if (isPlatformBrowser(this.platformId)) {
    this.startAutoPlay();
  }
}

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    this.testimonialsService.nextSlide();
  }

  prevSlide(): void {
    this.testimonialsService.prevSlide();
  }

  goToSlide(index: number): void {
    this.testimonialsService.goToSlide(index);
  }

  toggleViewMode(): void {
    this.testimonialsService.toggleViewMode();
  }

  setViewMode(mode: 'carousel' | 'grid'): void {
    this.testimonialsService.setViewMode(mode);
  }

  startAutoPlay(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.stopAutoPlay();
    this.autoPlayTimer = setInterval(() => {
      if (this.isAutoPlayActive() && this.viewMode() === 'carousel') {
        this.nextSlide();
      }
    }, 6000);
  }

  stopAutoPlay(): void {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
  }

  pauseAutoPlay(): void {
    this.isAutoPlayActive.set(false);
  }

  resumeAutoPlay(): void {
    this.isAutoPlayActive.set(true);
  }

  // Touch Gesture Handlers (Mobile & Tablet)
  onTouchStart(event: TouchEvent): void {
    this.pauseAutoPlay();
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent): void {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipeGesture();
    this.resumeAutoPlay();
  }

  // Mouse Drag Handlers (Desktop)
  onMouseDown(event: MouseEvent): void {
    this.pauseAutoPlay();
    this.isDragging = true;
    this.touchStartX = event.screenX;
  }

  onMouseUp(event: MouseEvent): void {
    if (!this.isDragging) return;
    this.isDragging = false;
    this.touchEndX = event.screenX;
    this.handleSwipeGesture();
    this.resumeAutoPlay();
  }

  private handleSwipeGesture(): void {
    const swipeDistance = this.touchEndX - this.touchStartX;
    const threshold = 40;

    if (swipeDistance < -threshold) {
      this.nextSlide();
    } else if (swipeDistance > threshold) {
      this.prevSlide();
    }
  }
}
