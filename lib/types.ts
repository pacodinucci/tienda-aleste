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

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  apart?: string;
  city: string;
  zipCode: string;
  observations?: string;
  region: string;
  deliveryAddress: boolean;
  deliveryAddressLine: string;
  deliveryPhone: string;
  deliveryApart: string;
  deliveryCity: string;
  deliveryRegion: string;
  deliveryZipCode: string;
  deliveryFullName: string;
  deliveryDays: string[];
  deliveryTime: string[];
}
