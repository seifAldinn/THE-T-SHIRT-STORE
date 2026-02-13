
import React from 'react';
import { Order } from '../types';
import { Package, ChevronRight, Clock, MapPin, ExternalLink } from 'lucide-react';

interface OrdersPageProps {
  orders: Order[];
  onNavigateToShop: () => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ orders, onNavigateToShop }) => {
  return (
    <div className="pt-32 pb-24 bg-white dark:bg-black min-h-screen text-black dark:text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-serif mb-4 uppercase tracking-tight">Your Orders</h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm uppercase tracking-[0.2em]">
            History of your signature essentials
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <div className="bg-gray-50 dark:bg-neutral-900 p-8 rounded-full mb-6">
               <Package size={48} className="text-gray-200 dark:text-neutral-800" />
            </div>
            <h2 className="text-2xl font-serif mb-2">No orders yet</h2>
            <p className="text-gray-400 dark:text-gray-500 text-sm max-w-xs mb-8">
              Your purchase history is currently empty. Start your collection today.
            </p>
            <button 
              onClick={onNavigateToShop}
              className="px-10 py-4 bg-black dark:bg-white text-white dark:text-black text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order.id} className="group border dark:border-white/10 bg-white dark:bg-neutral-900/50 hover:border-black dark:hover:border-white transition-all duration-300">
                <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between border-b dark:border-white/10 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-neutral-800 flex items-center justify-center rounded-full">
                      <Clock size={20} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Order ID: #{order.id}</p>
                      <p className="text-sm font-bold">{new Date(order.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-right">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Total</p>
                      <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    </div>
                    <div className={`px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-full ${
                      order.status === 'Processing' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400' :
                      'bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className="p-6 md:p-8 bg-gray-50/50 dark:bg-black/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex space-x-4">
                        <div className="w-16 h-20 bg-gray-100 dark:bg-neutral-800 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="text-[11px] font-bold uppercase tracking-wide truncate max-w-[120px]">{item.name}</h4>
                          <p className="text-[9px] text-gray-400 uppercase tracking-tighter">Color: {item.selectedColor} | Qty: {item.quantity}</p>
                          <p className="text-[10px] font-bold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="px-8 py-4 border-t dark:border-white/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                      <MapPin size={12} />
                      <span>Track Shipment</span>
                    </span>
                    <span className="flex items-center space-x-1 hover:text-black dark:hover:text-white cursor-pointer transition-colors">
                      <ExternalLink size={12} />
                      <span>Order Details</span>
                    </span>
                  </div>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
