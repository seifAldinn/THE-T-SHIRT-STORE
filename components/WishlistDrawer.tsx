
import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onMoveToCart: (product: Product) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose, items, onRemove, onMoveToCart }) => {
  return (
    <>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-40 z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[101] transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
            <div className="flex items-center space-x-2">
              <Heart size={20} className="fill-red-500 text-red-500" />
              <h2 className="text-lg font-bold tracking-widest uppercase font-serif">Loved Items</h2>
              <span className="text-xs text-gray-400 font-sans">({items.length})</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <Heart size={48} className="text-gray-100" />
                <p className="text-gray-500 italic">No loved items yet.</p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-black text-white text-xs font-bold uppercase tracking-widest"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={item.id} className="flex space-x-4 group">
                    <div className="w-24 h-32 bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wide">{item.name}</h3>
                        <span className="font-bold">${item.price}</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <button 
                          onClick={() => onMoveToCart(item)}
                          className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest bg-black text-white px-4 py-2 hover:bg-gray-800 transition-all"
                        >
                          <ShoppingCart size={12} />
                          <span>Add to Bag</span>
                        </button>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default WishlistDrawer;
