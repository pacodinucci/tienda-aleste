export interface Product {
  id?: string;
  title: string;
  category: string;
  type: string;
  year: string;
  size: string;
  harvest: String;
  fermentation: String;
  aging: String;
  notes: String;
  composition: String;
  cellar: String;
  alcohol: String;
  ph: String;
  src: string;
  discount?: string;
  price: string;
  stock: number;
  available: boolean;
  boxSize: string;
  weight: string;
  user?: any;
  updatedAt: Date;
  createdAt: Date;
}

export interface ShippingInfo {
  fullName: string;
  phone: string;
  email: string;
  identification: string;
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
