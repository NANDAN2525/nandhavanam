export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  unit: string;
  image: string;
  imageWidth?: number;
  imageHeight?: number;
  badge?: string;
  comingSoon?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  subscriptionDuration: string;
  initials: string;
  rating: number;
}

export interface TimelineStep {
  time: string;
  title: string;
  description: string;
}

export interface PurityFeature {
  iconName: string;
  title: string;
  description: string;
}

export interface ComparisonRow {
  feature: string;
  nandhavanam: string;
  market: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}
