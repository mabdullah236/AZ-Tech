export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  description: string;
  image: string;
  features: string[];
  taxRate: number;
}

export enum ProductCategory {
  LAPTOPS = 'Laptops',
  AUDIO = 'Audio',
  WEARABLES = 'Wearables',
  ACCESSORIES = 'Accessories',
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}