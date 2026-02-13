
import React from 'react';
import { X, CheckCircle, Mail, RefreshCw, Smartphone } from 'lucide-react';
import { CartItem, User } from '../types';
import { generateWhatsAppLink } from '../utils/orderUtils';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
  items: CartItem[];
  total: number;
  user: User | null;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, orderId, items, total, user }) => {
  if (!isOpen) return null;

  const handleWhatsAppManual = () => {
    const url = generateWhatsAppLink(orderId, items, total, user);
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose} />
      <div className="relative bg-white dark:bg-neutral-950 w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in fade-in duration-300 border dark:border-white/10">
        
        {/* Header */}
        <div className="p-8 border-b dark:border-white/10 flex justify-between items-center bg-gray-50 dark:bg-black/50">
          <div className="flex items-center space-x-3 text-green-600 dark:text-green-500">
            <CheckCircle size={32} />
            <div>
              <h2 className="text-2xl font-serif uppercase tracking-tight text-black dark:text-white">Fulfillment Successful</h2>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Order ID: #{orderId}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-full transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Dispatch Status Bar */}
        <div className="bg-indigo-600 text-white px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail size={14} />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Automatic Emails Dispatched</span>
          </div>
          <span className="text-[9px] uppercase tracking-widest opacity-80">Background Process Verified</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="bg-gray-50 dark:bg-white/5 p-6 border border-dashed border-gray-200 dark:border-white/10">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-gray-500 dark:text-gray-400">Order Manifest</h3>
            <div className="space-y-4">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <div className="flex flex-col">
                    <span className="font-bold dark:text-white">{item.name}</span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-widest">{item.selectedColor} x {item.quantity}</span>
                  </div>
                  <span className="font-bold dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t dark:border-white/10 flex justify-between items-center">
              <span className="text-lg font-serif dark:text-white">Total Amount</span>
              <span className="text-2xl font-bold dark:text-white">${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/30 rounded-lg">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 dark:text-indigo-500 mb-1">Client Receipt</h4>
              <p className="text-sm font-bold dark:text-white">{user?.name || "Guest Checkout"}</p>
              <p className="text-xs text-indigo-600 dark:text-indigo-400 truncate">{user?.email || "Email Confirmation Sent"}</p>
              <div className="mt-2 flex items-center text-[8px] font-black uppercase text-green-600 dark:text-green-400 tracking-tighter">
                <CheckCircle size={8} className="mr-1" />
                Injected into inbox
              </div>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">Store Alert</h4>
              <p className="text-sm font-bold dark:text-white">Admin Fulfillment Center</p>
              <p className="text-xs text-gray-400">Automatic alert dispatched to owner</p>
              <div className="mt-2 flex items-center text-[8px] font-black uppercase text-green-600 dark:text-green-400 tracking-tighter">
                <CheckCircle size={8} className="mr-1" />
                Inventory Updated
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="p-8 border-t dark:border-white/10 bg-gray-50 dark:bg-black/50">
          <p className="text-center text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-4">Manual Fallback</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={handleWhatsAppManual}
              className="flex items-center justify-center space-x-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 px-8 py-4 font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
            >
              <Smartphone size={14} />
              <span>WhatsApp Copy</span>
            </button>
            <button 
              onClick={onClose}
              className="flex items-center justify-center space-x-3 bg-black dark:bg-white text-white dark:text-black px-10 py-4 font-bold text-xs uppercase tracking-widest hover:opacity-80 transition-all shadow-lg"
            >
              <span>Back to Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
