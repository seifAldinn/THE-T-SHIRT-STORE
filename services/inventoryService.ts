
import { INITIAL_PRODUCTS } from '../constants';
import { Product, CartItem, Order } from '../types';

const DB_KEY = 'tshirt_store_db';

export const inventoryService = {
  initialize: () => {
    if (!localStorage.getItem(DB_KEY)) {
      localStorage.setItem(DB_KEY, JSON.stringify(INITIAL_PRODUCTS));
    }
  },

  getProducts: (): Product[] => {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : INITIAL_PRODUCTS;
  },

  saveProducts: (products: Product[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(products));
  },

  addProduct: (product: Product) => {
    const products = inventoryService.getProducts();
    products.push(product);
    inventoryService.saveProducts(products);
  },

  updateProduct: (updatedProduct: Product) => {
    const products = inventoryService.getProducts();
    const index = products.findIndex(p => p.id === updatedProduct.id);
    if (index !== -1) {
      products[index] = updatedProduct;
      inventoryService.saveProducts(products);
    }
  },

  deleteProduct: (productId: string) => {
    const products = inventoryService.getProducts();
    const filtered = products.filter(p => p.id !== productId);
    inventoryService.saveProducts(filtered);
  },

  updateStock: (productId: string, quantitySold: number): boolean => {
    const products = inventoryService.getProducts();
    const index = products.findIndex(p => p.id === productId);
    
    if (index !== -1 && products[index].stock >= quantitySold) {
      products[index].stock -= quantitySold;
      inventoryService.saveProducts(products);
      return true;
    }
    return false;
  },

  // User Specific Data
  saveUserCart: (email: string, cart: CartItem[]) => {
    localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  },

  getUserCart: (email: string): CartItem[] => {
    const data = localStorage.getItem(`cart_${email}`);
    return data ? JSON.parse(data) : [];
  },

  saveUserWishlist: (email: string, productIds: string[]) => {
    localStorage.setItem(`wishlist_${email}`, JSON.stringify(productIds));
  },

  getUserWishlist: (email: string): string[] => {
    const data = localStorage.getItem(`wishlist_${email}`);
    return data ? JSON.parse(data) : [];
  },

  // Order Management
  saveOrder: (email: string, order: Order) => {
    const orders = inventoryService.getUserOrders(email);
    orders.unshift(order); // Newest first
    localStorage.setItem(`orders_${email}`, JSON.stringify(orders));
  },

  getUserOrders: (email: string): Order[] => {
    const data = localStorage.getItem(`orders_${email}`);
    return data ? JSON.parse(data) : [];
  }
};
