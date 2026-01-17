// Review-related types

export interface Review {
  id: number;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title?: string;
  content: string;
  verified?: boolean;
  helpful?: number;
}
