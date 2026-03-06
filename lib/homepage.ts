export interface HomepageClient {
  name: string;
  context?: string;
}

export interface HomepageTestimonial {
  quote: string;
  author: string;
  title: string;
}

export const homepageContent = {
  showRosterPreview: false,
  clients: [] as HomepageClient[],
  testimonials: [] as HomepageTestimonial[]
};
