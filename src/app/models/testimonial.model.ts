export interface Testimonial {
  id: number | string;
  clientName: string;
  role: string;
  company: string;
  avatarUrl: string;
  rating: number;
  review: string;
  highlightMetric: string;
  date?: string;
  isUserSubmitted?: boolean;
}
