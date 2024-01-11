export interface Category {
  name: string;
}
export interface Event {
  id: number;
  title: string;
  category: number;
  date: Date;
  description: string;
  location: string;
}
