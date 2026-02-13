
import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-black border-t dark:border-white/10 pt-20 pb-10 transition-colors">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Info */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl tracking-widest uppercase">The T-Shirt Store</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Quality over quantity. We believe in crafting the perfect basic that lasts a lifetime.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400 transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-gray-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-gray-400 transition-colors"><Twitter size={20} /></a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-black dark:text-white">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#shop" className="hover:text-black dark:hover:text-white transition-colors">Shop All</a></li>
              <li><a href="#new" className="hover:text-black dark:hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#men" className="hover:text-black dark:hover:text-white transition-colors">Men's Collection</a></li>
              <li><a href="#women" className="hover:text-black dark:hover:text-white transition-colors">Women's Collection</a></li>
              <li><a href="#sale" className="hover:text-black dark:hover:text-white transition-colors">Sale</a></li>
            </ul>
          </div>

          {/* Help Links */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-black dark:text-white">Help</h4>
            <ul className="space-y-4 text-sm text-gray-500 dark:text-gray-400">
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-black dark:hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-black dark:text-white">Newsletter</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Join our mailing list for updates on new drops and exclusive offers.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full border-b border-black dark:border-white bg-transparent py-2 pr-10 focus:outline-none text-sm dark:text-white"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 hover:opacity-50">
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest pt-10 border-t dark:border-white/10">
          <p>© 2024 The T-Shirt Store. All Rights Reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-black dark:hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-black dark:hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
