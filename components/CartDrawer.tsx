
import React from 'react';
import { X, Minus, Plus, Trash2, ShoppingBag, CheckCircle, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, color: string, delta: number) => void;
  onRemoveItem: (id: string, color: string) => void;
  onCheckout: () => void;
  isProcessing?: boolean;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  isProcessing = false
}) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-black z-[101] transform transition-transform duration-500 ease-in-out border-l dark:border-white/10 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-neutral-900/50">
            <div className="flex items-center space-x-2">
              <ShoppingBag size={20} />
              <h2 className="text-lg font-bold tracking-widest uppercase font-serif">Your Bag</h2>
              <span className="text-xs text-gray-400 dark:text-gray-500 font-sans">({items.length} items)</span>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <ShoppingBag size={48} className="text-gray-200 dark:text-neutral-800" />
                <p className="text-gray-500 dark:text-gray-400 italic font-serif">Your bag is currently empty.</p>
                <button 
                  onClick={onClose}
                  className="px-8 py-3 bg-black dark:bg-white dark:text-black text-white text-xs font-bold uppercase tracking-widest"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                {items.map((item) => (
                  <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex space-x-4 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="w-24 h-32 bg-gray-100 dark:bg-neutral-900 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="text-sm font-bold uppercase tracking-wide">{item.name}</h3>
                          <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase">
                            Color: {item.selectedColor} | Size: {item.selectedSize}
                          </p>
                        </div>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                      
                      <div className="mt-auto flex justify-between items-center">
                        <div className="flex items-center border border-gray-200 dark:border-neutral-800">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedColor, -1)}
                            className="p-1 px-3 hover:bg-gray-50 dark:hover:bg-neutral-900"
                            disabled={isProcessing}
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-bold px-2">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.selectedColor, 1)}
                            className="p-1 px-3 hover:bg-gray-50 dark:hover:bg-neutral-900 disabled:opacity-30"
                            disabled={item.quantity >= item.stock || isProcessing}
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemoveItem(item.id, item.selectedColor)}
                          className="text-gray-400 dark:text-neutral-600 hover:text-red-500 transition-colors"
                          disabled={isProcessing}
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

          {items.length > 0 && (
            <div className="p-6 border-t dark:border-white/10 bg-gray-50 dark:bg-neutral-900/50 shadow-inner">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400">Subtotal</span>
                <span className="text-2xl font-bold font-serif">${subtotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={onCheckout}
                disabled={isProcessing}
                className="w-full bg-black dark:bg-white dark:text-black text-white py-5 font-bold uppercase tracking-[0.2em] hover:opacity-90 transition-all flex items-center justify-center space-x-3 disabled:opacity-50"
              >
                {isProcessing ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <CheckCircle size={20} />
                )}
                <span>{isProcessing ? 'Processing...' : 'Complete Purchase'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
