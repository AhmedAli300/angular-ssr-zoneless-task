import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { ServiceItem } from '../models/service.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyServicesService {
  servicesData: WritableSignal<ServiceItem[]>;

  /** Readonly signal of services */
  readonly services: Signal<ServiceItem[]>;

  constructor() {
    const initialServices: ServiceItem[] = [
      {
        id: 'social-media',
        title: 'Social Media Management',
        shortDescription: 'Build thriving digital communities, brand loyalty, and viral engagement across all major platforms.',
        detailedDescription: 'Full-funnel social media strategy including content creation, community engagement, brand voice curation, and hyper-targeted advertising.',
        badge: 'Popular',
        iconName: 'social-media',
        deliverables: ['Custom Content Calendars', 'Community Management', 'Paid Ad Campaigns', 'Performance Analytics']
      },
      {
        id: 'web-dev',
        title: 'Web Development',
        shortDescription: 'Modern, blazing-fast web applications built with cutting-edge frameworks, SSR, and pixel-perfect design.',
        detailedDescription: 'Enterprise-grade landing pages, web portals, and e-commerce platforms engineered for 100/100 Core Web Vitals, maximum SEO visibility, and high conversion.',
        badge: 'Core Expertise',
        iconName: 'web-dev',
        deliverables: ['Angular 20 & SSR Architecture', 'Mobile-First Responsive Layouts', 'Ultra-fast LCP & TTFB', 'Headless CMS Integration']
      },
      {
        id: 'mobile-apps',
        title: 'Mobile App Development',
        shortDescription: 'Seamless native and cross-platform mobile experiences that engage users on iOS and Android.',
        detailedDescription: 'From intuitive UI/UX design to robust backend integration, we build fluid, secure, and scalable mobile apps that top app store rankings.',
        badge: 'High Growth',
        iconName: 'mobile-apps',
        deliverables: ['iOS & Android Apps', 'Cross-Platform Flutter/Native', 'Real-time Push Notifications', 'App Store Optimization (ASO)']
      },
      {
        id: 'seo-optimization',
        title: 'SEO Optimization',
        shortDescription: 'Dominate organic search rankings and turn high-intent traffic into qualified, paying customers.',
        detailedDescription: 'Technical SEO audits, semantic keyword mapping, structured schema markup, and authoritative link building strategies to outrank competitors.',
        badge: 'Organic ROI',
        iconName: 'seo-optimization',
        deliverables: ['Technical SEO Audits', 'Core Web Vitals Optimization', 'Keyword & Competitor Strategy', 'Authority Link Acquisition']
      },
      {
        id: 'influencers-marketing',
        title: 'Influencers Marketing',
        shortDescription: 'Connect your brand with resonant voices and creators to build authentic trust and reach millions.',
        detailedDescription: 'End-to-end influencer matchmaking, creative campaign conception, contract negotiation, and quantifiable ROI tracking across TikTok, Instagram, and YouTube.',
        badge: 'High Impact',
        iconName: 'influencers',
        deliverables: ['Vetted Influencer Roster', 'Campaign Creative Direction', 'Contract & Rights Management', 'Conversion Tracking & ROI']
      },
      {
        id: 'sms-campaigns',
        title: 'SMS Campaigns',
        shortDescription: 'Direct, instantaneous communication with 98% open rates that drives immediate conversions.',
        detailedDescription: 'Smart segmentation, localized messaging, automated transactional triggers, and bulk promotional blasts that keep customers coming back.',
        badge: 'Instant Reach',
        iconName: 'sms-campaigns',
        deliverables: ['98% Open Rate Delivery', 'Automated Trigger Flows', 'Hyper-segmented Audiences', 'Telecom Compliance & Opt-out']
      }
    ];

    this.servicesData = signal<ServiceItem[]>(initialServices);
    this.services = this.servicesData.asReadonly();
  }
}
