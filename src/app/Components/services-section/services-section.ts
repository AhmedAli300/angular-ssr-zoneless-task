import { Component, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyServicesService } from '../../services/company-services.service';
import { ScrollService } from '../../services/scroll.service';
import { ServiceItem } from '../../models/service.model';

@Component({
  selector: 'app-services-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-section.html',
  styleUrl: './services-section.css'
})
export class ServicesSection {
  services: Signal<ServiceItem[]>;

  constructor(
    private companyServices: CompanyServicesService,
    private scrollService: ScrollService
  ) {
    this.services = this.companyServices.services;
  }

  scrollToContact(): void {
    this.scrollService.scrollToSection('contact');
  }
}
