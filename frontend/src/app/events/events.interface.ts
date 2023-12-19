export interface Category {
  id: number;
  name: string;
  image: string;
}
export interface Event {
  id: number;
  categoryId: number;
  name: string;
  location: string;
  date: Date;
  description: string;
}
