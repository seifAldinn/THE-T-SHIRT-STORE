
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { Filter, ChevronDown, XCircle } from 'lucide-react';

interface ShopPageProps {
  products: Product[];
  wishlist: string[];
  initialCategory: string;
  searchQuery?: string;
  onAddToCart: (product: Product, selectedColor: string) => void;
  onToggleLove: (id: string) => void;
  onClearSearch?: () => void;
  onViewProduct?: (product: Product) => void;
}

const ShopPage: React.FC<ShopPageProps> = ({ 
  products, 
  wishlist, 
  initialCategory, 
  searchQuery = '',
  onAddToCart, 
  onToggleLove,
  onClearSearch,
  onViewProduct
}) => {
  const [category, setCategory] = useState(initialCategory || 'All');
  const [sortBy, setSortBy] = useState<'default' | 'priceLow' | 'priceHigh'>('default');

  const filteredProducts = useMemo(() => {
    let result = [...products];
    
    // 1. Filter by Search Query (Letter to Letter)
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }
    
    // 2. Filter by Category
    if (category === 'Sale') {
      result = result.filter(p => p.onSale);
    } else if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }
    
    // 3. Sorting
    if (sortBy === 'priceLow') result.sort((a, b) => a.price - b.price);
    else if (sortBy === 'priceHigh') result.sort((a, b) => b.price - a.price);
    
    return result;
  }, [products, category, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 uppercase tracking-tight">
            {searchQuery ? `Results for "${searchQuery}"` : category}
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm uppercase tracking-[0.2em]">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-y dark:border-white/10 py-6 mb-12 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-8 text-xs font-bold uppercase tracking-widest overflow-x-auto w-full md:w-auto no-scrollbar">
            {['All', 'Men', 'Women', 'Unisex', 'Sale'].map(cat => (
              <button 
                key={cat} 
                onClick={() => setCategory(cat)} 
                className={`transition-colors whitespace-nowrap pb-2 ${category === cat ? 'text-black dark:text-white border-b-2 border-black dark:border-white' : 'text-gray-400 dark:text-gray-600 hover:text-black dark:hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-6 w-full md:w-auto justify-between md:justify-end">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest">
                <span>Sort By</span>
                <ChevronDown size={14} />
              </button>
              <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20">
                <div className="bg-white dark:bg-neutral-900 border dark:border-white/10 shadow-xl p-4 min-w-[180px] flex flex-col items-start space-y-3">
                  <button onClick={() => setSortBy('default')} className={`text-[10px] uppercase font-bold tracking-widest ${sortBy === 'default' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>Recommended</button>
                  <button onClick={() => setSortBy('priceLow')} className={`text-[10px] uppercase font-bold tracking-widest ${sortBy === 'priceLow' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>Price: Low to High</button>
                  <button onClick={() => setSortBy('priceHigh')} className={`text-[10px] uppercase font-bold tracking-widest ${sortBy === 'priceHigh' ? 'text-black dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>Price: High to Low</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                isLoved={wishlist.includes(product.id)}
                onAddToCart={onAddToCart} 
                onToggleLove={onToggleLove}
                onViewDetail={() => onViewProduct?.(product)}
              />
            ))}
          </div>
        ) : (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 dark:bg-neutral-900 p-8 rounded-full mb-6">
               <XCircle size={48} className="text-gray-200 dark:text-neutral-800" />
            </div>
            <h2 className="text-2xl font-serif mb-2">No results found</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mb-8">
              We couldn't find any items matching your search. Try adjusting your filters or search terms.
            </p>
            {searchQuery && onClearSearch && (
              <button 
                onClick={onClearSearch}
                className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
