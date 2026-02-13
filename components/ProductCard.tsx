
import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingCart, Heart, AlertCircle, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isLoved?: boolean;
  onAddToCart: (product: Product, selectedColor: string, selectedSize: string) => void;
  onToggleLove: (id: string) => void;
  onViewDetail?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isLoved = false, 
  onAddToCart, 
  onToggleLove,
  onViewDetail
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');

  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div 
      className={`group relative transition-all duration-500 ${isOutOfStock ? 'grayscale hover:grayscale-0' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-neutral-900 border dark:border-white/5 cursor-pointer"
        onClick={onViewDetail}
      >
        <img 
          src={isHovered ? product.hoverImage : product.image} 
          alt={product.name}
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${isOutOfStock ? 'opacity-60' : ''}`}
        />
        
        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.onSale && !isOutOfStock && (
            <div className="bg-black dark:bg-white dark:text-black text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-lg">Sale</div>
          )}
          {isLowStock && (
            <div className="bg-red-600 text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-lg flex items-center space-x-1">
              <AlertCircle size={10} />
              <span>Only {product.stock} left</span>
            </div>
          )}
          {isOutOfStock && (
            <div className="bg-gray-800 dark:bg-neutral-700 text-white text-[9px] px-3 py-1 font-black uppercase tracking-widest shadow-lg">Sold Out</div>
          )}
        </div>

        {/* Sold Out Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
             <span className="text-white text-xs font-bold uppercase tracking-[0.3em] bg-black/50 px-4 py-2 border border-white/20">Archived</span>
          </div>
        )}

        {!isOutOfStock && (
          <div className={`absolute inset-0 bg-black/20 dark:bg-black/40 transition-opacity duration-300 flex flex-col justify-end p-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="bg-white dark:bg-neutral-800 p-4 shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Select Size</span>
                <div className="flex space-x-2">
                  {product.sizes.map(size => (
                    <button 
                      key={size}
                      onClick={(e) => { e.stopPropagation(); setSelectedSize(size); }}
                      className={`w-6 h-6 text-[8px] font-bold border transition-colors ${selectedSize === size ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white' : 'border-gray-200 dark:border-neutral-700 hover:border-black dark:hover:border-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product, selectedColor, selectedSize); }}
                  className="bg-black dark:bg-white text-white dark:text-black py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-colors flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={14} />
                  <span>Add</span>
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onViewDetail?.(); }}
                  className="border-2 border-black dark:border-white text-black dark:text-white py-3 text-[10px] font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center justify-center space-x-2"
                >
                  <Eye size={14} />
                  <span>Detail</span>
                </button>
              </div>
            </div>
          </div>
        )}

        <button 
          onClick={(e) => { e.stopPropagation(); onToggleLove(product.id); }}
          className={`absolute top-4 right-4 p-2 rounded-full transition-all duration-300 z-10 ${isLoved ? 'bg-white scale-110 shadow-lg' : 'bg-white/0 group-hover:bg-white/100 hover:scale-110'}`}
        >
          <Heart size={18} className={`${isLoved ? 'fill-red-500 text-red-500' : 'text-black'}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <div onClick={onViewDetail} className="cursor-pointer">
            <h3 className={`text-sm font-medium tracking-wide uppercase group-hover:underline ${isOutOfStock ? 'text-gray-400 dark:text-gray-600' : ''}`}>{product.name}</h3>
            <p className="text-gray-400 dark:text-gray-500 text-[10px] uppercase font-bold tracking-tighter mt-1">
              {isOutOfStock ? 'Currently Unavailable' : `Color: ${selectedColor} | Size: ${selectedSize}`}
            </p>
          </div>
          <div className="text-right">
            {product.onSale ? (
              <div className="flex flex-col">
                <span className={`font-bold ${isOutOfStock ? 'text-gray-400' : 'text-red-600'}`}>${product.price}</span>
                <span className="text-gray-400 dark:text-gray-600 line-through text-xs">${product.originalPrice}</span>
              </div>
            ) : (
              <span className={`font-bold ${isOutOfStock ? 'text-gray-400 dark:text-gray-600' : ''}`}>${product.price}</span>
            )}
          </div>
        </div>

        <div className="flex space-x-2 mt-1">
          {product.colors.map((color) => (
            <button
              key={color.name}
              disabled={isOutOfStock}
              onClick={() => setSelectedColor(color.name)}
              className={`w-4 h-4 rounded-full border border-gray-300 dark:border-neutral-700 transition-transform ${selectedColor === color.name ? 'ring-2 ring-black dark:ring-white scale-125' : 'hover:scale-110'} ${isOutOfStock ? 'opacity-30 cursor-not-allowed' : ''}`}
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
