export interface Product {
  id?: string;
  title: string;
  category: string;
  type: string;
  year: string;
  size: string;
  description: string;
  src: string;
  discount?: string;
  price: string;
  stock: string;
  available: boolean;
  boxSize: string;
  user?: any; // Adjust this type according to your actual user type
  updatedAt: Date;
  createdAt: Date;
}
