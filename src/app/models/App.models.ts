export interface Product {
  name: string;
  price: string | number;
  sales: number;
  status: 'Active' | 'Inactive' | 'Draft' | 'Out of Stock' | string;
  fileUrl?: string;
}

export interface NewProduct {
  title: string;
  price: string | number;
  fileUrl: string;
}

export interface ProductPayload extends Product {}

export interface Lead {
  name: string;
  instagram: string;
  source: string;
  tags: string[];
}

export interface User {
  name: string;
  email: string;
  avatar?: string;
}