
import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Classic White Tee',
    price: 25,
    category: 'Unisex',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    description: 'The fundamental wardrobe staple. Made from 100% premium organic cotton.',
    colors: [
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Cream', hex: '#F5F5DC' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 15
  },
  {
    id: '2',
    name: 'Midnight Black Pocket Tee',
    price: 28,
    category: 'Men',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1583744946564-b52ac1c389c8?auto=format&fit=crop&q=80&w=800',
    onSale: true,
    originalPrice: 35,
    description: 'A sleek, versatile pocket tee for any occasion.',
    colors: [
      { name: 'Midnight', hex: '#121212' },
      { name: 'Charcoal', hex: '#36454F' }
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 8
  },
  {
    id: '3',
    name: 'Ocean Blue Oversized',
    price: 32,
    category: 'Women',
    image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&q=80&w=800',
    hoverImage: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800',
    description: 'Relaxed fit with a modern silhouette.',
    colors: [
      { name: 'Ocean', hex: '#0077BE' },
      { name: 'Sky', hex: '#87CEEB' }
    ],
    sizes: ['XS', 'S', 'M'],
    stock: 4
  }
];
