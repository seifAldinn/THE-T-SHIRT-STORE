
import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { ShoppingBag, Heart, Shield, Truck, RefreshCw, ChevronRight } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  allProducts: Product[];
  wishlist: string[];
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onToggleLove: (id: string) => void;
  onViewProduct: (product: Product) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  allProducts,
  wishlist,
  onAddToCart,
  onToggleLove,
  onViewProduct
}) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');

  // Filter related products by category or shared color names, excluding current product
  const relatedProducts = useMemo(() => {
    return allProducts
      .filter(p => p.id !== product.id && (p.category === product.category || p.colors.some(c => product.colors.map(pc => pc.name).includes(c.name))))
      .slice(0, 4);
  }, [allProducts, product]);

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="pt-24 md:pt-32 pb-24 bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <div className="container mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-8">
          <button onClick={() => window.location.reload()} className="hover:text-black dark:hover:text-white">Home</button>
          <ChevronRight size={10} />
          <span className="hover:text-black dark:hover:text-white cursor-pointer">{product.category}</span>
          <ChevronRight size={10} />
          <span className="text-black dark:text-white">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-32">
          {/* Product Images */}
          <div className="space-y-6">
            <div className="aspect-[3/4] bg-gray-50 dark:bg-neutral-900 overflow-hidden border dark:border-white/5">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="aspect-[3/4] bg-gray-50 dark:bg-neutral-900 border dark:border-white/5">
                 <img src={product.hoverImage} className="w-full h-full object-cover" />
               </div>
               <div className="aspect-[3/4] bg-gray-100 dark:bg-neutral-800 flex items-center justify-center p-8 text-center italic text-sm text-gray-400">
                  Detailed texture view coming soon
               </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-400 mb-2">{product.category} Collection</h2>
              <h1 className="text-4xl md:text-5xl font-serif tracking-tight mb-4">{product.name}</h1>
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.onSale && (
                  <span className="text-gray-400 dark:text-gray-600 line-through text-lg">${product.originalPrice}</span>
                )}
              </div>
            </div>

            <div className="prose dark:prose-invert max-w-none mb-10 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
              <p>{product.description}</p>
            </div>

            {/* Selection */}
            <div className="space-y-8 mb-12">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Color: <span className="text-black dark:text-white">{selectedColor}</span></span>
                <div className="flex space-x-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border border-gray-200 dark:border-neutral-800 transition-all ${selectedColor === color.name ? 'ring-2 ring-black dark:ring-white scale-110 shadow-md' : 'hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3 block">Size: <span className="text-black dark:text-white">{selectedSize}</span></span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-3 text-xs font-bold uppercase tracking-widest border transition-all ${selectedSize === size ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white' : 'text-gray-500 border-gray-100 dark:border-neutral-800 hover:border-black dark:hover:border-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button 
                onClick={() => onAddToCart(product, selectedColor, selectedSize)}
                disabled={isOutOfStock}
                className="flex-1 bg-black dark:bg-white text-white dark:text-black py-5 px-8 font-bold text-xs uppercase tracking-[0.2em] hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all flex items-center justify-center space-x-3 disabled:bg-gray-200 dark:disabled:bg-neutral-800 disabled:cursor-not-allowed"
              >
                <ShoppingBag size={18} />
                <span>{isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
              </button>
              <button 
                onClick={() => onToggleLove(product.id)}
                className={`p-5 border flex items-center justify-center transition-all ${wishlist.includes(product.id) ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/30 text-red-500' : 'border-gray-100 dark:border-neutral-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'}`}
              >
                <Heart size={20} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t dark:border-white/10">
              <div className="flex flex-col items-center text-center space-y-2">
                <Truck size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Free Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <RefreshCw size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Easy Returns</span>
              </div>
              <div className="flex flex-col items-center text-center space-y-2">
                <Shield size={18} className="text-indigo-600 dark:text-indigo-400" />
                <span className="text-[9px] font-bold uppercase tracking-widest">Secure Checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS SECTION */}
        {relatedProducts.length > 0 && (
          <section className="border-t dark:border-white/10 pt-24">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-2">Complete your look</h4>
                <h3 className="text-3xl font-serif">Suggested Styles</h3>
              </div>
              <div className="w-1/2 h-[1px] bg-gray-100 dark:bg-neutral-800 hidden md:block"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(relProduct => (
                <ProductCard 
                  key={relProduct.id}
                  product={relProduct}
                  isLoved={wishlist.includes(relProduct.id)}
                  onAddToCart={(p, c, s) => onAddToCart(p, c, s)}
                  onToggleLove={onToggleLove}
                  onViewDetail={() => onViewProduct(relProduct)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
