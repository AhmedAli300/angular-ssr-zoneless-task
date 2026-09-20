export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export interface SubmittedContact extends ContactFormData {
  id: string;
  submittedAt: string;
}
