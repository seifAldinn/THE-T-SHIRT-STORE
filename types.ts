
export interface ColorVariant {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Men' | 'Women' | 'Unisex';
  image: string;
  hoverImage: string;
  onSale?: boolean;
  originalPrice?: number;
  description: string;
  colors: ColorVariant[];
  sizes: string[];
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered';
}

export interface User {
  email: string;
  name: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
