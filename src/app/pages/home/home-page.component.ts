import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../Components/navbar/navbar';
import { HeroSection } from '../../Components/hero-section/hero-section';
import { ServicesSection } from '../../Components/services-section/services-section';
import { Testimonials } from '../../Components/testimonials/testimonials';
import { ContactUs } from '../../Components/contact-us/contact-us';
import { SuccessModal } from '../../Components/success-modal/success-modal';
import { Footer } from '../../Components/footer/footer';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroSection,
    ServicesSection,
    Testimonials,
    ContactUs,
    SuccessModal,
    Footer
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  constructor() {}
}
