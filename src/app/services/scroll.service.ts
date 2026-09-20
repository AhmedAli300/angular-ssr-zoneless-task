import { Injectable, PLATFORM_ID, Inject, signal, WritableSignal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  /** Signal indicating whether user has scrolled past top threshold */
  readonly isScrolled: WritableSignal<boolean>;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly router: Router
  ) {
    this.isScrolled = signal<boolean>(false);

    if (isPlatformBrowser(this.platformId)) {
      this.initScrollListener();
    }
  }

  private initScrollListener(): void {
    const handleScroll = (): void => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      this.isScrolled.set(scrollY > 30);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  /**
   * Smoothly scrolls to target section element by ID
   * Works across all routes (e.g. from /done back to /#contact)
   * and reliably triggers deferred below-the-fold components
   */
  scrollToSection(sectionId: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // If currently on another page (such as /done), navigate home first
    const currentUrl = this.router.url.split('#')[0].split('?')[0];
    if (currentUrl !== '' && currentUrl !== '/') {
      this.router.navigate(['/']).then(() => {
        // Wait briefly for route transition and DOM render
        setTimeout(() => this.performScroll(sectionId), 150);
      });
      return;
    }

    this.performScroll(sectionId);
  }

  private performScroll(sectionId: string, attempt = 0): void {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      const navbarOffset = 85;
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      
      window.scrollTo({
        top: Math.max(0, elementPosition - navbarOffset),
        behavior: 'smooth'
      });
      return;
    }

    // If element is not found immediately (e.g., inside @defer below the fold),
    // scroll down partially to trigger @defer on viewport, then retry
    if (attempt < 8) {
      window.scrollBy({ top: 500, behavior: 'smooth' });
      setTimeout(() => this.performScroll(sectionId, attempt + 1), 100);
    }
  }
}
