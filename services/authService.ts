
import { User } from '../types';

const AUTH_KEY = 'tshirt_store_auth';
const ADMIN_CREDENTIAL = 'safaldenalden@gmail.com';

export const authService = {
  getCurrentUser: (): User | null => {
    const data = localStorage.getItem(AUTH_KEY);
    return data ? JSON.parse(data) : null;
  },

  login: (email: string, name: string, password?: string): User => {
    /**
     * Strict check for Admin credentials:
     * 1. Email must match exactly 'safaldenalden@gmail.com' (Case sensitive, no trimming)
     * 2. Password must match exactly 'safaldenalden@gmail.com' (Case sensitive, no trimming)
     */
    const isAdmin = email === ADMIN_CREDENTIAL && password === ADMIN_CREDENTIAL;
    const role = isAdmin ? 'admin' : 'user';
    
    const user: User = { 
      email, 
      name: isAdmin ? 'Safalden' : name, 
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      role 
    };
    
    localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    return user;
  },

  logout: () => {
    localStorage.removeItem(AUTH_KEY);
  }
};
